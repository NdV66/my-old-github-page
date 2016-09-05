$(document).ready(function main(){
/*------ ------ ------ ------ TOOLS ------ ------ ------ ------*/
    var MAIN = MAIN || {}; 
    
    /*------ ------ ------ ------ create overlaing ------ ------ ------ ------*/
    MAIN.overlay = function overlay(overlayId){        
        var $window = $(window),
            overlay = $(overlayId),
            sectionPositionTop = overlay.offset().top; //on start
            
        /**
         * This function creates an overlaing of div#image. 
         * @param {String} ID of image - this image with names
         * @returns {undefined}
         */      
        function startOverlaing(imageId) {
            $window.scroll(function onScroll(){                
                var imageHeight = $(imageId).outerHeight(),
                    scrollTop = $window.scrollTop(),
                    offsetValue = 0;

                if(imageHeight - scrollTop > 0) {
                    offsetValue = sectionPositionTop - scrollTop;
                    offsetValue = offsetValue + 'px';
                    overlay.css({
                        'top': offsetValue
                    });
                }
            });
        }
        
        return {
            startOverlaing: startOverlaing
        };      
    }; 
    
    /*------ ------ ------ ------ set image's height ------ ------ ------ ------*/
    MAIN.setHeightImage = (function setHeightImage(){
        var image = $('#image'),
            $window = $(window);        
        
        function set(){ //TODO
            $window.on('resize', function(){
                image.css({
                    'height': $window.outerHeight() + 'px'
                });           
            });
            $window.trigger('resize');
        }
        
        return {
            set: set
        }; 
    })();
    
    /*------ ------ ------ ------ switch names ------ ------ ------ ------*/
    MAIN.switchNames = (function(){
        var nick = $('#nick'),
            name = $('#real-name');
        
        /**
         * Binf event to switch names
         * @returns {undefined}
         */
        function bindSwitch() {
            $('#names').on('click', function switchNames(){
                
                function setHidden() {
                    if(nick.hasClass('hidden')) {
                        nick.removeClass('hidden');
                        name.addClass('hidden');
                    } else {
                        name.removeClass('hidden');
                        nick.addClass('hidden');
                    }   
                }
                
                $('#names>span:not(.hidden)').animate({
                    'top': '400px',
                    'opacity': '0'
                }, 900, function afterAimate(){
                    $('#names>span:not(.hidden)').css({
                        'top': '0',
                        'opacity': '1'
                    });        
                    setHidden();
                });   
            });  
        }
        
        return {
            bindSwitchNames: bindSwitch
        };
    })();
    
    /*------ ------ ------ ------ buttons on image controller ------ ------ ------ ------*/
    MAIN.scrollToElement = (function init(){
        function scrollToElement(elementId) {
            var $window = $(window);
            $('html,body').animate({
                scrollTop: $(elementId).offset().top - $window.outerHeight()}, //offset - image heigt (this image with names) + correction
                1000);
                console.log($window.outerHeight());
        }
        
        /*
         * Binds all function-buttons to a event
         * @returns {undefined}
         */
        function bindAll() {
            $('.buttons button').each(function(){
                $(this).on('click', function() {
                    var id = $(this).attr('id'),
                        div = id.replace(/-button/g, '');
                    scrollToElement('#' + div);
                });
            });
        }
        
        return {
            bindAll: bindAll
        };
    })();       

/*------ ------ ------ ------ LOGICAL PART ------ ------ ------ ------*/  
    MAIN.setHeightImage.set();
    MAIN.switchNames.bindSwitchNames();
    MAIN.overlay('#overlay').startOverlaing('#image');
    MAIN.scrollToElement.bindAll();
});

