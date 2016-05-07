var Epulae = function(options){
    this.epulaeContainer = $('<div>').addClass('epulaeContainer text-center');
    this.bannerContainer = $('<div>').addClass('bannerContainer');
    this.navigationContainer = $('<div>').addClass('navigationContainer text-center');
    this.addItemInputContainer = $('<div>').addClass('addItemInputContainer');
    this.optionsContainer = $('<div>').addClass('optionsContainer');
    this.cardsContainer = $('<div>').addClass('cardsContainer text-center col-xs-8 col-xs-offset-2');
    this.AppOptions = options;
    this.epulaeContainer.data('AppOptions',options);

    this.applyBanner();
    this.applyNavigation();
    this.applyAddItemPanel();
    this.applyCards();
    this.assemble();

};

Epulae.prototype  = {

    applyBanner: function(){
        var pictureURL = this.AppOptions['bannerImage'];
        var bannerName = this.AppOptions['bannerTitle'];
        var bannerInnerContainer = $('<div>').addClass('bannerInnerContainer').text(bannerName);
        bannerInnerContainer.prepend($('<i>').addClass('fa fa-cutlery'));
        bannerInnerContainer.addClass('titleText');
        this.bannerContainer.append(bannerInnerContainer.clone());
        //this.bannerContainer.css('background-image','linear-gradient(to left, rgba(131,175,155, 0.4), rgba(200,200,169, 0.4)), url('+ pictureURL +')');

    },

    applyNavigation: function(){
        var searchItemContainer = $('<div>').addClass('searchItemContainer col-xs-8');
        var searchItemBar = $('<input>').addClass('searchItemBar button ghost').attr('placeholder','Search Cards');
        var addItemButtonContainer = $('<div>').addClass('addItemButtonContainer col-xs-2');
        var addItemButton = $('<div>').addClass('addItemButton button circular cta');
        var optionsButtonContainer =  $('<div>').addClass('optionsButtonContainer col-xs-2');
        var optionsButton = $('<div>').addClass('optionsButton button circular cta');
        searchItemContainer.append(searchItemBar);
        optionsButton.append($('<i>').addClass('fa fa-bars'));
        optionsButton.click(this.optionsButtonClick);
        optionsButtonContainer.append(optionsButton);
        addItemButton.append($('<i>').addClass('fa fa-plus'));
        addItemButton.click(this.addItemNaviClick);
        addItemButtonContainer.append(addItemButton);
        this.navigationContainer.append(addItemButtonContainer);
        this.navigationContainer.append(searchItemContainer);
        this.navigationContainer.append(optionsButtonContainer);
    },

    applyAddItemPanel: function(){
        var addItemIcon = $('<img>').addClass('icon icons8-Vegetarian-Food').attr('src',"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAEhUlEQVRoQ92aj3UNURDGv1SACkgFpAJUgApIBagAFZAKUAEqIBWQCkQFogLO752dZzJ7d+/c+/LO7sk9J8eLNzt3vvk/sznQOs4dSW8l3ZPE57lzLumHpGNJF5HwYAV4bkr6KYl/Ww5gDiOoNQD6LOlRCxJH+0XSY//sGgD97rCOYcD9sNL2rAHQ32Cdmkyz9LWHOz2h6bFrB4jgvtGkgv/Ev2JWXIOFPkh62gnoRNKLtcUQWepTJ6CHkr6tDdD3oaD2YAIMoFaT5Z5Jeh+QjLTuvn8g6esc/dIxhHAIaeejJEDOHaxyf6q4LgmIvg138+do6NPmAJWsRHGlyGpJQO8kPXeSnwZrzYGiOb3rCN5Ier00IBpS31nTPZPCMyfG3rYFWspC0d3+DOBG48AEOjpzesCRu+4DEHMNPn2pCw6X4x6vGpNBxBa79E2RzQJCIxntUbUBVHOfmKmeSELAlhPdjrg6ygLC15lZ0MLUgYa46Em9t5IK83eX3O4wCwhGBB6d8SY9Di0HwtvvVlO2KXQGvBemJbtFljHbHbcAmuq5cC8YU1POhjaGZhN6BPe9Fvdt0utQQPlMZrP/a3E5aGPqP5kDhDC4GYUMV0NoPhMncWTmOzIXwvMcn0un1NZk47PELyr5dAoQGga9LS4QGGF8YgDY7cEStU0NaRl6rAFYumv4z8Vkxlox/Z9HQADgMt9fGWML9hINAjOkMXABkoMSUABCWwYrKcpcNgOgRHNp4vWAEJTALrkLsWEgIw1gEJ6GEZfjd++SgDLrYpXorvY9PHrOJCDa+NjpIhxCWNCWZhc0TE9miiDLQe+nUC80iuGHu8yaZEoa00yti6CLgEodLILiKlyCsBTM6IrWFHqmLwclEDMA8/sCYojv4RnXV5n6lXa5OJfwoFV7Ah4gloYtPrCc1SBfD/ycjxvzrFkPQDxTGuyKm9CED44sZBU+PssFZqUaX99XWaGELzyiGwEOBZZWv7WWKWWhkrb8gwQ61kBQE44EYJqnD/P1wFzH+jrAWsBDN1WjuLPH7UYW2mWNhBDW6piVLK5iR12zMt/3tEEjQLHzzVzsabbT4lA4URA8exXV0o4hxwjQLstyA1baBcSJNKuonQHF3XL2Yk9HbBFL1oha/PTwWgUgExxAJAASTesLLHiMdtUJjYxc7ioslLg3RbKKpJCSNEl07QCN3iYkFDFyuTj1JXjsjeRKOoXSSnZvElcY9yxLit02DaO18kuB6YmfYmHlP3valKsGbmNHK9+ihagZ1I+lrNRTfwz45MRa67pbNddC35MMqoAg2OWvOloAeNre2EkBssWgf/fSK2jmuda3DiWeky5nxIAi6/X+7UAGCDSAYUjs3fbAYzRtT3W2+7aUB8NdpsSsMqAr7QfPaq1675A2JxgxwyjOyDG3C2wBZ7SpZT1uQZ3yb557Los7PlsJ19bI2bs2LwpqFvLM0CqDWyswaoy9ZfD84quQrOAlOtvsXrQA8kkDcLanw20sKyI8CQV3ogQw8NnuriQItY+fViUZL4DQXG9fNv8DFu0dC5SgG/MAAAAASUVORK5CYII=").css('height','52px').css('width','52px').append('<br>');
        var addItemTitle = $('<div>').addClass('exo-font').text('Add New Food Item').append('<br>');
        var addItemName = $('<input>').addClass('button ghost name').attr('placeholder',"Name");
        var addItemDate = $('<input>').addClass('button ghost expiration-date').attr('placeholder',"Expiration Date").attr('type','date');
        var addItemNumber = $('<input>').addClass('button ghost quantity').attr('placeholder',"Quantity").append('<br>');
        var addItemSubmitButton = $('<div>').addClass('button cta circular add-food-item-submit').text('Go');
        addItemSubmitButton.click(this.addItemButtonClick);
        this.addItemInputContainer.append(addItemIcon).append(addItemTitle).append(addItemName).append(addItemDate).append(addItemNumber).append(addItemSubmitButton);
    },

    addItemNaviClick: function(){
        console.log('button clickeddd.');
        $('.addItemInputContainer').fadeIn(1000);
    },

    applyCards: function(){
        this.getCardData(this.AppOptions);
    },

    getCardData: function(AppOptions){
        $.get("http://localhost:1020/downloadFoodItems", function(allData){
            var dataOptimizer = new DataOptimizer();
            for(var i =0;i<allData.length;i++){
                var card = new Cardify(dataOptimizer.upconvert(allData[i]),AppOptions);
            }
            $(document).ready(function(){
                equalHeight(('.card'));
            });
        });
    },

    optionsButtonClick: function(){
        console.log("Options button clicked");
        //Show Options Pane and hide the navigation pane
    },

    addItemButtonClick: function(){
        var addItemInputContainer = $('.addItemInputContainer');
        var addItemInputData = getAllValues($(this).closest('card').find('input'));
        console.log(addItemInputData);
        var postNewAddress = $(this).closest('.epulaeContainer').data('AppOptions').postNewAddress;
        $.post(
            postNewAddress,
            addItemInputData,
            function( data ) {
                swal({
                    title: "Food Item Added!",
                    text: "Your fridge is getting better!",
                    type: "success",
                    confirmButtonText: "Cool" });
            },
            'json'
        )
    },

    assemble: function(){
        this.epulaeContainer.append(this.bannerContainer);
        $(this.epulaeContainer).append(this.navigationContainer);
        $(this.epulaeContainer).append(this.addItemInputContainer.hide());
        $(this.epulaeContainer).append(this.cardsContainer);
        $('body').append(this.epulaeContainer);

    },
};

function getAllValues(element) {
    var inputValues = [];
    var datum = {key:'',value:''};
    $(element).find('input').each(function () {
        var type = $(this).attr("type");
        if ((type == "checkbox" || type == "radio") && this.checked) {
            datum['key'] = $(this).attr('placeholder');
            datum['value'] = $(this).val();
            inputValues.push(JSON.parse(JSON.stringify(datum)));
        }
        else if (type != "button" || type != "submit") {
            datum['key'] = $(this).attr('placeholder');
            datum['value'] = $(this).val();
            inputValues.push(JSON.parse(JSON.stringify(datum)));
        }
    });
    return inputValues;
}

function equalHeight(group) {
    $(group).css('height','100%');
    tallest = 0;
    $(group).each(function() {
        thisHeight = $(this).height();
        if(thisHeight > tallest) {
            tallest = thisHeight;
        }
    });
    $(group).height(tallest);
}