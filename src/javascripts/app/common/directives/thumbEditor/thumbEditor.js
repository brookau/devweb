define([
  'angular',
  'text!./template.html',
  'app/common/services/uploadFileService'
],
function (angular, template) {
  'use strict';

  return angular.module('ernr.directives.thumbEditor', ['ernr.uploadFile'])
    .controller('thumbEditorComtroller', ['$scope', '$sce', function ($scope, $sce) {
      var resizeImage = function(width, height){
        $scope.canvas.width = width;
        $scope.canvas.height = height;
        $scope.canvas.getContext('2d').drawImage($scope.tempSrc, 0, 0, width, height);
        $($scope.imageTarget).attr('src', $scope.canvas.toDataURL("image/png"));
      };

      var saveEventState = function(e){
        // Save the initial event details and container state
        $scope.eventState.containerWidth = $scope.$container.width();
        $scope.eventState.containerHeight = $scope.$container.height();
        $scope.eventState.containerLeft = $scope.$container.offset().left;
        $scope.eventState.containerTop = $scope.$container.offset().top;
        $scope.eventState.mouseX = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) + $(window).scrollLeft();
        $scope.eventState.mouseY = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + $(window).scrollTop();

      // This is a fix for mobile safari
      // For some reason it does not allow a direct copy of the touches property
      if(typeof e.originalEvent.touches !== 'undefined'){
        $scope.eventState.touches = [];
        $.each(e.originalEvent.touches, function(i, ob){
          $scope.eventState.touches[i] = {};
          $scope.eventState.touches[i].clientX = 0+ob.clientX;
          $scope.eventState.touches[i].clientY = 0+ob.clientY;
        });
      }
        $scope.eventState.evnt = e;
      };

      var startMoving = function(e){
        e.preventDefault();
        e.stopPropagation();
        saveEventState(e);
        $(document).on('mousemove touchmove', moving);
        $(document).on('mouseup touchend', endMoving);
      };

      var endMoving = function(e){
        e.preventDefault();
        $(document).off('mouseup touchend', endMoving);
        $(document).off('mousemove touchmove', moving);
      };

      var moving = function(e){
        var mouse = {},
            touches;

        e.preventDefault();
        e.stopPropagation();

        touches = e.originalEvent.touches;

        mouse.x = (e.clientX || e.pageX || touches[0].clientX) + $(window).scrollLeft();
        mouse.y = (e.clientY || e.pageY || touches[0].clientY) + $(window).scrollTop();

        $scope.$container.offset({
          'left': mouse.x - ($scope.eventState.mouseX - $scope.eventState.containerLeft),
          'top': mouse.y - ($scope.eventState.mouseY - $scope.eventState.containerTop)
        });

        // Watch for pinch zoom gesture while moving
        if($scope.eventState.touches && $scope.eventState.touches.length > 1 && touches.length > 1) {
          var width = $scope.eventState.containerWidth, height = $scope.eventState.containerHeight;
          var a = $scope.eventState.touches[0].clientX - $scope.eventState.touches[1].clientX;
          a = a * a;
          var b = $scope.eventState.touches[0].clientY - $scope.eventState.touches[1].clientY;
          b = b * b;
          var dist1 = Math.sqrt( a + b );

          a = e.originalEvent.touches[0].clientX - touches[1].clientX;
          a = a * a;
          b = e.originalEvent.touches[0].clientY - touches[1].clientY;
          b = b * b;
          var dist2 = Math.sqrt( a + b );

          var ratio = dist2 /dist1;

          width = width * ratio;
          height = height * ratio;
          // To improve performance you might limit how often resizeImage() is called
          resizeImage(width, height);
        }
      };

      var resizing = function (e) {
        var mouse={}, width, height, left, top, offset = $scope.$container.offset();
        mouse.x = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) + $(window).scrollLeft();
        mouse.y = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + $(window).scrollTop();

        // Position image differently depending on the corner dragged and constraints
        if( $($scope.eventState.evnt.target).hasClass('resize-handle-se') ){
          width = mouse.x - $scope.eventState.containerLeft;
          height = mouse.y - $scope.eventState.containerTop;
          left = $scope.eventState.containerLeft;
          top = $scope.eventState.containerTop;
        } else if($($scope.eventState.evnt.target).hasClass('resize-handle-sw') ){
          width = $scope.eventState.containerWidth - (mouse.x - $scope.eventState.containerLeft);
          height = mouse.y - $scope.eventState.containerTop;
          left = mouse.x;
          top = $scope.eventState.containerTop;
        } else if($($scope.eventState.evnt.target).hasClass('resize-handle-nw') ){
          width = $scope.eventState.containerWidth - (mouse.x - $scope.eventState.containerLeft);
          height = $scope.eventState.containerHeight - (mouse.y - $scope.eventState.containerTop);
          left = mouse.x;
          top = mouse.y;
          if($scope.constrain || e.shiftKey){
            top = mouse.y - ((width / $scope.tempSrc.width * $scope.tempSrc.height) - height);
          }
        } else if($($scope.eventState.evnt.target).hasClass('resize-handle-ne') ){
          width = mouse.x - $scope.eventState.containerLeft;
          height = $scope.eventState.containerHeight - (mouse.y - $scope.eventState.containerTop);
          left = $scope.eventState.containerLeft;
          top = mouse.y;
          if($scope.constrain || e.shiftKey){
            top = mouse.y - ((width / $scope.tempSrc.width * $scope.tempSrc.height) - height);
          }
        }

        // Optionally maintain aspect ratio
        if($scope.constrain || e.shiftKey){
          height = width / $scope.tempSrc.width * $scope.tempSrc.height;
        }

        if(width > $scope.minWidth && height > $scope.minHeight){
          // To improve performance you might limit how often resizeImage() is called
          resizeImage(width, height);
          // Without this Firefox will not re-calculate the the image dimensions until drag end
          $scope.$container.offset({'left': left, 'top': top});
        }
      };

      var endResize = function(e){
        e.preventDefault();
        $(document).off('mouseup touchend', endResize);
        $(document).off('mousemove touchmove', resizing);
      };

      var startResize = function(e){
        e.preventDefault();
        e.stopPropagation();
        saveEventState(e);
        $(document).on('mousemove touchmove', resizing);
        $(document).on('mouseup touchend', endResize);
      };

      $scope.edit = false;

      $scope.startEdit = function () {
        if (!$scope.imageTarget.src) {
          return false;
        }

        var width  = $scope.imageTarget.width,
            height = $scope.imageTarget.height;

        $scope.edit = true;
        $scope.origSrc.src = $scope.imageTarget.src;
        $scope.tempSrc.src = $scope.imageTarget.src;

        $scope.canvas.getContext('2d').drawImage($scope.imageTarget, 0, 0, width, height);

        $scope.$container.on('mousedown touchstart', 'img', startMoving);
        $scope.$container.on('mousedown touchstart', '.resize-handle', startResize);
      };

      $scope.finishEdit = function () {
        $scope.edit = false;
        $scope.$container.off('mousedown touchstart', 'img', startMoving);
        $scope.$container.off('mousedown touchstart', '.resize-handle', startResize);

        if ($scope.asBlob) {
          $scope.canvas.toBlob(function(blob) {
            $scope.img.blob = blob;
            $scope.img.url = $scope.tempSrc.src;
          }, 'image/jpeg');
        } else {
          $scope.img.url = $scope.tempSrc.src;
        }
      };

      $scope.crop = function () {
        //Find the part of the image that is inside the crop box
        var left = $scope.overlay.offset().left - $scope.$container.offset().left,
            top =  $scope.overlay.offset().top - $scope.$container.offset().top,
            width = $scope.overlay.width(),
            height = $scope.overlay.height();

        $scope.canvas.width = width;
        $scope.canvas.height = height;
        $scope.canvas.getContext('2d').drawImage($scope.imageTarget, left, top, width, height, 0, 0, width, height);

        $($scope.imageTarget).attr('src', $scope.canvas.toDataURL("image/png"));
        $scope.tempSrc.src = $scope.imageTarget.src;

        $scope.$container.offset({
          'left': $scope.overlay.offset().left + 2,
          'top': $scope.overlay.offset().top + 2
        });
      };

      $scope.rotate = function () {
        var width = $scope.imageTarget.width,
            height = $scope.imageTarget.height,
            ctx = $scope.canvas.getContext('2d');

        $scope.canvas.width = height;
        $scope.canvas.height = width;

        ctx.translate(height, width / height);

        ctx.rotate(Math.PI/2);
        ctx.drawImage($scope.imageTarget, 0, 0);

        $($scope.imageTarget).attr('src', $scope.canvas.toDataURL("image/png"));

        $scope.tempSrc.src = $scope.imageTarget.src;
      };

      $scope.reset = function () {
        var width = $scope.origSrc.width,
            height = $scope.origSrc.height;

        $scope.canvas.width = width;
        $scope.canvas.height = height;
        $scope.canvas.getContext('2d').drawImage($scope.origSrc, 0, 0, width, height);

        $($scope.imageTarget).attr('src', $scope.canvas.toDataURL("image/png"));

        $scope.tempSrc.src = $scope.origSrc.src;
      };

      $scope.showFilesSelect = function () {
        $scope.hideInput.click();
      };

      $scope.trustSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
      };
    }])
    .directive('thumbEditor', ['uploadFileFactory', function (uploadFile) {
      return {
        restrict: 'E',
        scope: {
          name: '@',
          img: '=ngModel',
          asBlob: '=',
          cropAreaWidth: '=',
          cropAreaHeight: '='
        },
        link: function (scope, element, attrs) {
          scope.imageTarget = element.find('img.resize-image').get(0);
          scope.thumbEditor = element.find('.thumb-editor').get(0);
          scope.hideInput = element.find('input');
          scope.overlay = element.find('.overlay');
          scope.$container = $(scope.imageTarget).parent('div');
          scope.canvas = document.createElement('canvas');
          scope.origSrc = new Image();
          scope.tempSrc = new Image();
          scope.eventState = {};
          scope.constrain = false;
          scope.minWidth = scope.cropAreaWidth || 200;
          scope.minHeight = scope.cropAreaHeight || 200;

          scope.overlay.width(scope.minWidth);
          scope.overlay.height(scope.minHeight);

          scope.origSrc.setAttribute('crossOrigin', 'anonymous');
          scope.tempSrc.setAttribute('crossOrigin', 'anonymous');

          scope.handleFileSelect = function (e) {
            var isInput = e instanceof HTMLElement,
                files;

            function setThumb (thumb) {
              scope.$apply(function () { scope.img.url = thumb; });
            }

            function checkImg(files, index) {
              var i = index || files.length - 1,
                  url = URL.createObjectURL(files[i]),
                  img = new Image();

              img.onload = function() {
                if (img.width > 1500 || img.height > 1500) {
                  scope.$apply(function () { scope.error = true; });
                } else {
                  uploadFile.generateThumb(files[i], setThumb);
                }
              };

              img.src = url;
            }

            if (isInput) {
              files = e.files;
            } else {
              e.stopPropagation();
              e.preventDefault();

              files = e.dataTransfer.files;
            }

            scope.$apply(function () { scope.error = false; });
            
            checkImg(files);
          };

          scope.handleDragOver = function (evt) {
            evt.stopPropagation();
            evt.preventDefault();
            evt.dataTransfer.dropEffect = 'copy';
          };

          scope.thumbEditor.addEventListener('dragover', scope.handleDragOver, false);
          scope.thumbEditor.addEventListener('drop', scope.handleFileSelect, false);
        },
        controller: 'thumbEditorComtroller',
        template: template
      };
    }]);
});

