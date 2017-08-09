var countries, filteredCountries, regions, subRegions;
var selectedCountries = [];

var app = function(){
    var url = 'https://restcountries.eu/rest/v2/all';
    makeRequest(url, requestComplete);

    var regionSelect = document.querySelector('#region-filter');
    regionSelect.onchange = onRegionChanged;

    var subRegionSelect = document.querySelector('#sub-region-filter');
    subRegionSelect.disabled = true;
    subRegionSelect.onchange = onSubRegionChanged;

    var countrySelect = document.querySelector('#country-select');
    countrySelect.disabled = true;

    var submitCountriesButton = document.querySelector('#submit-countries');
    submitCountriesButton.onclick = onSubmitCountriesClick;
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
    var regionSelect = document.querySelector('#region-filter');
    regionSelect.innerHTML = '';
    regions = new Set(_.map(countries, 'region'));
    // <option disabled selected value>Select a region...</option>
    regions.add('All');

    var disabledOption = document.createElement('option');
    disabledOption.disabled = true;
    disabledOption.selected = true;
    disabledOption.innerText = 'Please select a region...';
    regionSelect.appendChild(disabledOption);

    regions.forEach(function(region){
        var option = document.createElement('option');
        option.innerText = region;
        regionSelect.appendChild(option);
    });
}

var onRegionChanged = function(){
    var subRegionSelect = document.querySelector('#sub-region-filter');
    subRegionSelect.disabled = false;

    var countrySelect = document.querySelector('#country-select');
    countrySelect.disabled = true;

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

    var disabledOption = document.createElement('option');
    disabledOption.disabled = true;
    disabledOption.selected = true;
    disabledOption.innerText = 'Please select a sub-region...';
    subRegionSelect.appendChild(disabledOption);

    subRegions.add('All');
    subRegions.forEach(function(subRegion){
        var option = document.createElement('option');
        option.innerText = subRegion;
        subRegionSelect.appendChild(option);
    });
}

var onSubRegionChanged = function(){
    var countrySelect = document.querySelector('#country-select');
    countrySelect.disabled = false;

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

var onSubmitCountriesClick = function(){
    var selected = document.querySelectorAll('#country-select option:checked');
    var values = Array.from(selected).map((el) => el.value);

    values.forEach(function(value){
        var country = _.find(countries, {name: value});
        selectedCountries.push(country);
    });
    debugger;
    selectedCountries.forEach(function(selectedCountry){
        //PUSH TO DB
    })
};

window.addEventListener('load', app);