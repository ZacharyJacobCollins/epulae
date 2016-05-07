var Cardify = function (DataModel,options){

    this.cards = $('<div>').addClass('cards');
    this.card = $('<div>').addClass('card').addClass('col-xs-4');
    this.cardTitle = $('<div>').addClass('cardTitle');
    this.cardElements = $('<div>').addClass('cardElements');
    this.cardInputs = $('<div>').addClass('cardInputs');
    this.cardPictureContainer = $('<div>').addClass('cardPictureContainer');
    this.cardPicture = $('<img>').addClass('cardPicture');
    this.cardElement = $('<div>').addClass('cardElement');
    this.cardElementName = $('<span>').addClass('cardElementName');
    this.cardElementValue = $('<span>').addClass('cardElementValue');
    this.cardEditInput =  $('<input>').addClass('cardEditInput');
    this.cardEditButton = $('<div>').addClass('cardEditButton');
    this.cardSaveButton = $('<div>').addClass('cardSaveButton');
    this.cardDeleteButton = $('<div>').addClass('cardDeleteButton');
    this.cardButtonContainer = $('<div>').addClass('cardButtonContainer');
    this.cardControlContainer = $('<div>').addClass('cardControlContainer');
    this.DataModel = DataModel;
    this.options = options;


    this.applyPicture();
    this.applyElements();
    this.applyCardControls();
    this.applyElementInputs();
    this.assemble();
    $(this.options.cardsLocation).append(this.card);

};

Cardify.prototype = {

    applyTitle: function(){
        $(this.cardTitle).text(this.DataModel[_.find(this.DataModel,{'key':'Name'})]);
    },

    styleFirstElement: function(){

    },

    applyPicture: function(){
        console.log(this.DataModel);
        var pictureURL = _.find(this.DataModel,{'key':'Image'}).value;
        console.log(pictureURL);
        this.cardPicture.css('background-image', 'url(' + pictureURL + ')');
        this.cardElements.prepend(this.cardPictureContainer.clone().append(this.cardPicture));
    },

    applyElements: function(){
        for(var i=0;i<this.DataModel.length;i++){
            if(this.DataModel[i]['key']=="Image"){continue;}
            if(this.DataModel[i]['hidden']==true){continue;}
            var newCardElement = $(this.cardElement).clone();
            var newElementName = $(this.cardElementName).clone().text(this.DataModel[i]['key']+": ");
            var newElementValue =$(this.cardElementValue).clone().text(this.DataModel[i]['value']);
            $(newCardElement).append(newElementName.append(newElementValue));
            $(this.cardElements).append(newCardElement);
        }
    },

    applyCardControls: function() {
        var newButtonContainer = $(this.cardButtonContainer).clone();
        var newEditButton = $(this.cardEditButton).clone().text('Edit').addClass('button ghost lg');
        var newSaveButton = $(this.cardSaveButton).clone().text('Save').addClass('button ghost lg').hide();
        var newDeleteButton = $(this.cardDeleteButton).clone().text('Delete').addClass('button cta lg');
        newEditButton.click(this.editButtonClick);
        newSaveButton.click(this.saveButtonClick);
        newDeleteButton.click(this.deleteButtonClick);
        this.cardControlContainer.append(newButtonContainer.clone().append(newEditButton).append(newSaveButton).addClass('col-xs-6'));
        this.cardControlContainer.append(newButtonContainer.clone().append(newDeleteButton).addClass('col-xs-6'));
    },

    editButtonClick: function(){
      //Hide the card elements
        console.log("Edit button clicked");
        var $this = $(this);
        var parent = $(this).closest('.card');
        parent.find('.cardElements').hide();
        parent.find('.cardInputs').fadeIn();
        parent.find('.cardEditButton').hide();
        parent.find('.cardSaveButton').fadeIn();
    },

    saveButtonClick: function(){
        //Ajax post
        var $this = $(this);
        var parent = $this.closest('.card');
        var cardData = parent.data('data');
        $.post(
            this.options.postEditAddress,
            cardData,
            function(){
                console.log("Card has been saved. :)");
            },
            'json'
        ).always(function(){
            parent.find('.cardInputs').hide();
            parent.find('.cardElements').fadeIn();
            parent.find('.cardSaveButton').hide();
            parent.find('.cardEditButton').fadeIn();
        });
    },

    deleteButtonClick:function(){
        //Sweetalert deletion confirmation
        var $this = $(this);
        var parent = $this.closest('.card');
        var id = _.find(parent.data('data'),{'key':'_id'}).value;
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            closeOnConfirm: false
        }).then(function(isConfirm) {
            if (isConfirm) {
                $.post( "http://localhost:1020/deleteFoodItem",
                    {'id':id},
                    function(){
                        swal(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        );
                        parent.fadeOut(1000);
                    },
                    'json'
                );
            }
        })
    },

    applyElementInputs: function(){
        for(var i=0;i<this.DataModel.length;i++){
            if(this.DataModel[i]['hidden']==true){continue;}
            var newCardEditInput = $(this.cardEditInput).clone();
            newCardEditInput.attr('placeholder',this.DataModel[i]['key']);
            newCardEditInput.val(this.DataModel[i]['value']);
            newCardEditInput.addClass('button ghost lg');
            $(this.cardInputs).append(newCardEditInput);
            $(this.cardInputs).hide();
        }
    },

    assemble: function(){
        $(this.card).data('data',this.DataModel);
        $(this.card).append(this.cardTitle);
        $(this.card).append(this.cardElements);
        $(this.card).append(this.cardInputs);
        $(this.card).append(this.cardControlContainer);
    },

};