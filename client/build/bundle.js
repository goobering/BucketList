/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var countries, filteredCountries, regions, subRegions;

var app = function(){
    var url = 'https://restcountries.eu/rest/v2/all';
    makeRequest(url, requestComplete);

    var regionSelect = document.querySelector('#region-filter');
    regionSelect.onchange = onRegionChanged;

    var subRegionSelect = document.querySelector('#sub-region-filter');
    subRegionSelect.onchange = onSubRegionChanged;

    var countrySelect = document.querySelector('#country-select');
    countrySelect.onchange = onCountryChanged;
}

var makeRequest = function(url, callback){
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', callback);
    request.send();
};

var requestComplete = function(){
    if(this.status !== 200) 
        return;

    var jsonString = this.responseText;
    countries = JSON.parse(jsonString);
    filteredCountries = countries;
    populateRegions();
};

var populateRegions = function(){
    var regionSelect = document.querySelector('#GETNAMEFROMJI');
    regionSelect.innerHTML = '';
    regions = new Set(_.map(countries, 'region'));
    regions.add('All');
    regions.forEach(function(region){
        var option = document.createElement('option');
        option.innerText = region;
        regionSelect.appendChild(option);
    });
}

var onRegionChanged = function(){
    if(this.value === 'All'){
        filteredCountries = countries;
        subRegions = new Set(_.map(countries, 'subregion'));
    } else {
        filteredCountries = _.filter(countries, {region: this.value});
        subRegions = new Set(_.map(filteredCountries, 'subregion'));
    };

    populateSubRegions();
}

var populateSubRegions = function(){
    var subRegionSelect = document.querySelector('#sub-region-filter');
    subRegionSelect.innerHTML = '';

    subRegions.add('All');
    subRegions.forEach(function(subRegion){
        var option = document.createElement('option');
        option.innerText = subRegion;
        subRegionSelect.appendChild(option);
    });
}

var onSubRegionChanged = function(){
    if(this.value !== 'All'){
        filteredCountries = _.filter(countries, {subregion: this.value});
    };

    populateCountries();
};

var populateCountries = function(){
    var countrySelect = document.querySelector('#country-select');
    countrySelect.innerHTML = '';

    filteredCountries.forEach(function(country){
        var option = document.createElement('option');
        option.innerText = country.name;
        countrySelect.appendChild(option);
    });
}

window.addEventListener('load', app);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map