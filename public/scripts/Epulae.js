var Epulae = function(options){
    this.epulaeContainer = $('<div>').addClass('epulaeContainer');
    this.bannerContainer = $('<div>').addClass('bannerContainer');
    this.navigationContainer = $('<div>').addClass('navigationContainer text-center');
    this.addItemInputContainer = $('<div>').addClass('addItemInputContainer');
    this.optionsContainer = $('<div>').addClass('optionsContainer');
    this.cardsContainer = $('<div>').addClass('cardsContainer col-sm-8 col-sm-offset-2');
    this.AppOptions = options;

    this.applyBanner();
    this.applyNavigation();
    this.applyCards();
    this.assemble();

};

Epulae.prototype  = {

    applyBanner: function(){
        var pictureURL = this.AppOptions['bannerImage'];
        var bannerName = this.AppOptions['bannerTitle'];
        this.bannerContainer.text(bannerName);
        this.bannerContainer.css('background-image','linear-gradient(to left, rgba(131,175,155, 0.4), rgba(200,200,169, 0.4)), url('+ pictureURL +')');
        this.bannerContainer.addClass('titleText');
        this.bannerContainer.prepend($('<i>').addClass('fa fa-cutlery'));
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
        optionsButtonContainer.append(optionsButton.clone());
        addItemButton.append($('<i>').addClass('fa fa-plus'));
        addItemButton.click(this.addItemButtonClick);
        addItemButtonContainer.append(addItemButton.clone());
        this.navigationContainer.append(addItemButtonContainer.clone());
        this.navigationContainer.append(searchItemContainer.clone());
        this.navigationContainer.append(optionsButtonContainer.clone());
    },

    applyCards: function(){
        this.getCardData(this.AppOptions);
        this.equalHeight($(this.cardsContainer).find('.card'));
    },

    equalHeight: function(group) {
        $(group).css('height','100%');
        tallest = 0;
        group.each(function() {
            thisHeight = $(this).height();
            if(thisHeight > tallest) {
                tallest = thisHeight;
            }
        });
        group.height(tallest);
    },

    getCardData: function(AppOptions){

        $.get("http://localhost:1020/downloadFoodItems", function(allData){
            var dataOptimizer = new DataOptimizer();
            console.log(AppOptions);
            for(var i =0;i<allData.length;i++){
                var card = new Cardify(dataOptimizer.upconvert(allData[i]),AppOptions);
            }
        });
    },

    optionsButtonClick: function(){
        console.log("Options button clicked");
        //Show Options Pane and hide the navigation pane
    },

    addItemButtonClick: function(){
        var addItemInputContainer = $('.addItemInputContainer');
        var addItemInputData = [];
        addItemInputData.push(addItemInputContainer.find('input').each().val());
        console.log(addItemInputData);

        $.post(
            this.AppOptions.postNewAddress,
            addItemInputData,
            function( data ) {
                swal({
                    title: "Food Item Added!",
                    text: "Your fridge is getting better!",
                    type: "success",
                    confirmButtonText: "Cool" });
            },
            'json'
        );
    },

    assemble: function(){
        this.epulaeContainer.append(this.bannerContainer);
        $(this.epulaeContainer).append(this.navigationContainer);
        $(this.epulaeContainer).append(this.cardsContainer);
        $('body').append(this.epulaeContainer);
    }
};

//$(document).ready( function() {
//    //$(window).stellar();
//    downloadFoodItems();
//    $('.add-food-item').click(function() {
//
//        $('.add-food-item-panel').fadeIn();
//    });
//    $('.add-food-item-submit').click(addFoodItem);
//});

function downloadFoodItems() {
    
    $.get( "http://localhost:1020/downloadFoodItems", function( data ) {
        var FoodItems = data;
        var FoodCardClone = $('.card-container');
        
        console.log(FoodItems);

        for(var i = 0; i < FoodItems.length; i++){
            console.log("Cloning data...");

            console.log(FoodCardClone);
            FoodCardClone.find('.food-title').text(FoodItems[i]['name']);
            FoodCardClone.find('.category').text(FoodItems[i]['category']);
            FoodCardClone.find('.image').text(FoodItems[i]['image']);
            FoodCardClone.find('.expiration-date').text(FoodItems[i]['expiration date']);
            FoodCardClone.find('.days-remaining').text(FoodItems[i]['days remaining']);
            FoodCardClone.find('.edit-food-item').click(editFoodItem);
            FoodCardClone.find('.delete-food-item').click(deleteFoodItem);
            FoodCardClone.data('data', FoodItems[i]);
            $('.all-cards-container').append(FoodCardClone.clone(true,true));
        }
    });
}

function addFoodItem() {

    console.log("Add food item button clicked.");
    console.log({
        name: $('.name').val(),
        expirationDate:$('.expiration-date').val(),
        quantity:$('.quantity').val()});

    $.post( "http://localhost:1020/addFoodItem",
        {
            name: $('.name').val(),
            'expiration date': $('.expiration-date').val(),
            'quantity': $('.quantity').val()
        },
        function( data ) {
            swal({
                title: "Food Item Added!",
                text: "Your fridge is getting better!",
                type: "success",
                confirmButtonText: "Cool" });
        },
        'json');
};


var deleteFoodItem = function() {

    console.log("Delete button clicked.");
    var $this = $(this);
    
    var foodID = $this.parent('food-card').data('data').foodID;
    $.post( "http://localhost:1020/deleteFoodItem",
    foodID,
    function( data ) {
        swal({   title: "Are you sure?",   
        text: "You will not be able to recover this imaginary file!",   
        type: "warning",   
        showCancelButton: true,   
        confirmButtonColor: "#DD6B55",   
        confirmButtonText: "Yes, delete it!",   
        closeOnConfirm: false }, 
        function(){
            swal("Deleted!", "Your imaginary file has been deleted.", "success"); 
        });
    });
};

var editFoodItem = function() {
    console.log("Edit food item button clicked. ");
    $this = $(this);
    $.post("http://localhost:1020/editFoodItem",
    $this.parent('.food-card').data('data').foodID, 
    function( data ) {
        $( ".result" ).html( data );
    },
    'json');
};

function updateProgressBar() {
    
}

function options() {
    
}

