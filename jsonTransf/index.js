import * as json from './countries.json' assert{type:'json'}


const featureARRAY = json.default.features;

//class for storing the esential data of the countries
class Country {
    constructor(sovereign, admin, geometry, key) {
        this.key = key;
        this.sovereign = sovereign;
        this.admin = admin;
        this.geometry = geometry;
    }
}

//method that collects all the longitude and latitude pair arrays from the array of the border coords of the respective country
function collectCoord(node,result) {
    if(node.length === 2 && !Array.isArray(node[0]) && !Array.isArray(node[1])) {
        result.push(node);
        return;
    }
    node.forEach(item => {
        collectCoord(item,result);
    });

}

//method that calculates the radius of the earth based on the longitude and latitude

function radiusOfEarth(long, lat) {
    //to do
    return 6371; //radius of 1
}

//method that takes the array of longitude, latitude pair arrays and transforms it in an array of consecutively x,y,x coordonates, 
//ready to use in Float32Array for a bufferGeometry in three.js

function createCartesianArray(depth2Array, cartesianArray) {
    depth2Array.forEach(item => {
        let rad = Math.PI / 180;
        let long = item[0];
        let lat = item[1];
        let r = radiusOfEarth(long,lat);

        let x = r * Math.cos(rad * lat) * Math.cos(rad * long);
        let y = r * Math.cos(rad * lat) * Math.sin(rad * long);
        let z = r * Math.sin(rad * lat);
        
        cartesianArray.push(x);
        cartesianArray.push(y);
        cartesianArray.push(z);
    })
}

//processing the data

const countryDataArray = [];



for(let i = 0; i < featureARRAY.length; i++) {
    
    let current = featureARRAY[i];
    let flatSphericalCoord = [];
    let cartesianArray = [];

    let administrator = current.properties.ADMIN; //administrator of the dependency
    let sovereignt = current.properties.SOVEREIGNT; //the sovereign state of the dependency
    let coordArray = current.geometry.coordinates; //long lat array of border coordinates

    collectCoord(coordArray, flatSphericalCoord); //collects all points of that country
    createCartesianArray(flatSphericalCoord, cartesianArray); //transforms the spherical coord in cartesian ones

    let countryObject = new Country(sovereignt, administrator, cartesianArray, i);

    countryDataArray.push(countryObject);
}

export default countryDataArray;
