$(document).ready(function(){
// Calls stickyNav once on load
  stickyNav();

// Come-in effect
  (function($) {

      /**
       * Copyright 2012, Digital Fusion
       * Licensed under the MIT license.
       * http://teamdf.com/jquery-plugins/license/
       *
       * @author Sam Sehnert
       * @desc A small plugin that checks whether elements are within
       *     the user visible viewport of a web browser.
       *     only accounts for vertical position, not horizontal.
       */
    
      $.fn.visible = function(partial) {
        
          var $t            = $(this),
              $w            = $(window),
              viewTop       = $w.scrollTop(),
              viewBottom    = viewTop + $w.height(),
              _top          = $t.offset().top,
              _bottom       = _top + $t.height(),
              compareTop    = partial === true ? _bottom : _top,
              compareBottom = partial === true ? _top : _bottom;
        
        return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
      };       
    })(jQuery);

    (function($) {
      var hrefs = [$('.js-button').attr('href'), 'https://mobile.google.com'];

      $(window).on('resize', function() {
        $('.js-button').attr('href', function() {
          return hrefs[$(window).width() < 940 ? 0 : 1];
        });
      }).trigger('resize');
      
      var win = $(window);
      var allMods = $(".come-in-effect");
      
      allMods.each(function(i, el) {
        var el = $(el);
        if (el.visible(true)) {
          el.addClass("already-visible"); 
        } 
      });

      win.scroll(function(event) {
        allMods.each(function(i, el) {
          var el = $(el);
          if (el.visible(true)) {
            el.addClass("come-in"); 
          } 
        });  
      });
    })(jQuery);

// Slow scroll to about
  (function($) {
    $(".scroll-down a").click(function() {
        if ($(window).width() <= 940) {
          $('html, body').animate({
            scrollTop: $("#about").offset().top
          }, 1500);
        } else if ($(window).width() >= 941) {
          $('html, body').animate({
            scrollTop: $("#nav").offset().top
          }, 1500);
        }
    });
    $("#contactLink").click(function() {
      if ($(window).width() <= 940) {
        $('#mNav').prop("checked", !$('#mNav').prop("checked"))
      }
      $('html, body').animate({
        scrollTop: $("#contact").offset().top
      }, 2900);
    });
  })(jQuery);

// Nav Bar
  // Calls stickyNav on scroll
  window.onscroll = function() {
    stickyNav();
  };

  // Add/remove sticky class to/from nav when you reach its scroll position
  function stickyNav() {
    let url = location.href.split("/");
    let currentPage = url[url.length - 1].split('.')[0];
    let header = document.getElementsByClassName("navHeader")[0];
    // Get the offset position of the navbar
    let sticky = header.offsetTop;

    if (currentPage === "index" || currentPage === "" || currentPage === "#about") {
      if (window.pageYOffset >= sticky && document.body.clientWidth >= 940) {
        nav.classList.add("sticky");
      } else {
        nav.classList.remove("sticky");
      }
    } else {
      nav.classList.add("sticky");
    }
  }

// Current page active on nav bar

  let url = location.href.split("/");
  let navLinks = document.getElementsByTagName("nav")[0].getElementsByTagName("a");
  let currentPage = url[url.length - 1];
  for (let i=0; i<navLinks.length; i++) {
    let lb = navLinks[i].href.split("/");
    if (lb[lb.length-1] == currentPage) {
       navLinks[i].className = "current-link";
    }
  }

// Contact Form

  var formContainer = $('#form-container');

  bindFormClick();
  //Opening the form
  function bindFormClick(){
    $(formContainer).on('click', function(e) {
      e.preventDefault();
      toggleForm();
      //Ensure container doesn't togleForm when open
      $(this).off();
    });
  }

  //Closing the form
  $('#form-close, .form-overlay').click(function(e) {
    e.stopPropagation();
    e.preventDefault();
    $('#my_iframe').hide();
    toggleForm();
    bindFormClick();
  });

  function toggleForm(){
    $(formContainer).toggleClass('expand');
    $(formContainer).children().toggleClass('expand');
    $('body').toggleClass('show-form-overlay');
    $('.form-submitted').removeClass('form-submitted');
    $('form').show();
  }

  //Form validation
  $('form').submit(function() {
    var form = $(this);
    form.find('.form-error').removeClass('form-error');
    var formError = false;
    
    form.find('.input').each(function() {
      if ($(this).val() == '') {
        $(this).addClass('form-error');
        $(this).select();
        formError = true;
        return false;
      }
      else if ($(this).hasClass('email') && !isValidEmail($(this).val())) {
        $(this).addClass('form-error');
        $(this).select();
        formError = true;
        return false;
      }
    });
    
    if (!formError) {
      form.hide();
      $('#my_iframe').show();
      form.submit();
    }
    return false;
  });

  $('#my_iframe').on('load', function() {
    try {
      $(this)[0].contentWindow.location.href
      $('#my_iframe').hide();
      $('body').addClass('form-submitted');
      $('#form-head').addClass('form-submitted'); 
      setTimeout(function(){
        $('form').trigger("reset");
      }, 1000);
    } catch (error) {}
  });

  function isValidEmail(email) {
      var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
      return pattern.test(email);
  };

  // Resume options
  let options = {
    pdfOpenParams: { pagemode: 'none', scrollbar: '1', toolbar: '1'},
    fallbackLink: '<p>This browser does not support inline PDFs. Please download the PDF to view it: <a href="./documents/CZPurdy_Resume.pdf">Download PDF</a></p>'
  };
  // Embed resume
  PDFObject.embed("./documents/CZPurdy_Resume.pdf", "#resume", options);

  // Fancybox Filtering
  (function($) {
    // filter selector
    $(".filter").on("click", function () {
      var $this = $(this);
      // if we click the active tab, do nothing
      if ( !$this.hasClass("active") ) {
        $(".filter").removeClass("active");
        $this.addClass("active"); // set the active tab
        // get the data-rel value from selected tab and set as filter
        var $filter = $this.data("rel"); 
        // if we select view all, return to initial settings and show all
        $filter == 'all' ? 
            $(".fancybox")
            .attr("data-fancybox", "gallery")
            .not(":visible")
            .fadeIn(300) 
        : // otherwise
            $(".fancybox")
            .fadeOut(300)
            .filter(function () {
                // set data-filter value as the data-rel value of selected tab
                return $(this).data("filter").includes($filter);
            })
            // set data-fancybox-group and show filtered elements
            .attr("data-fancybox", $filter)
            .fadeIn(300); 
      } // if
  }); // on
  })(jQuery); // ready

  // Fancybox -- construct divs for photos
  (function($) {
    let fancyboxOptions = {
      "protect": true
    };

    let currpath = document.location.pathname.match(/[^\/]+$/);
    if(currpath && currpath[0] === "photo.html"){
      $.getJSON('./images/photo-gallery/gallery.json', function( data ) {

        keysSorted = Object.keys(data).sort(function(a,b){return Date.parse(data[b].capture_datetime)-Date.parse(data[a].capture_datetime)});

        keysSorted.forEach(element => {

          $('#photo-gallery').append($([
            "<a class='fancybox come-in-effect' data-options='"
            ,JSON.stringify(fancyboxOptions),
            "' data-fancybox='gallery' data-filter='"
            ,data[element].keywords.join(' '),
            "'  href='./images/photo-gallery/"
            ,element,
            "'><img class='thumbnail' src='./images/photo-gallery/thumbnails/"
            ,element.split('.')[0],
            ".thumbnail'></a>"
          ].join("")));
        });

        
      });
    }
  })(jQuery);
}); //ready