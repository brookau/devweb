define(function () {
    'use strict';

    var directive = ['$timeout', '$rootScope', function ($timeout, $rootScope) {
        return {
            restrict: 'A',
            scope: {
                loadMore: '&aCarousel',
                stopLoadMore: '='
            },
            link: function (scope, element, attributes) {
                var slideAtOnce = attributes.slideAtOnce,
                    $nextBtn = element.find(".btn-next"),
                    $prevBtn = element.find(".btn-prev"),
                    containerHeight = element.height(),
                    $scroller = element.find("ul"),
                    page = 0,
                    totalPages = 0,
                    currentTop = 0,
                    totalItems = element.find("ul li").size(),
                    nothingToLoadMore = false,
                    onLoadingMore = false,
                    listener,
                    itemMargin = attributes.slideItemMargin,
                    itemHeight = attributes.slideItemHeight;

                function activeCarousel() {
                    containerHeight = element.height();
                    totalItems = element.find("ul li").size();
                    totalPages = Math.ceil(totalItems / slideAtOnce);
                }

                function next() {
                    if (page < totalPages - 1) {
                        page++;
                        var currentTop = page * slideAtOnce * itemHeight * (-1) - (itemMargin * slideAtOnce * page);
                        $scroller.stop(true, false).animate({
                            top: currentTop
                        }, 500);
                    } else if (page === totalPages - 1) {
                        loadMore();
                    }
                }

                function prev() {
                    if (page > 0) {
                        page--;
                        var currentTop = page * slideAtOnce * itemHeight * (-1) - (itemMargin * slideAtOnce * page);
                        $scroller.stop(true, false).animate({
                            top: currentTop
                        }, 500);
                    }
                }

                function loadMore() {
                    if (scope.stopLoadMore) {
                        return;
                    }
                    showLoadMore(true);
                    scope.loadMore();
                }

                function showLoadMore(show) {
                    if (show) {
                        if (!element.find(".ajax-loading").length)
                        {
                            element.prepend("<div class='ajax-loading'>Loading more...</div>");
                        }
                    } else {
                        element.find(".ajax-loading").remove();
                    }
                }

                $timeout(function () {
                    activeCarousel();
                });

                listener = $rootScope.$on("ACAROUSEL:UPDATE", function () {
                    $timeout(function () {
                        activeCarousel();
                    });
                });

                $nextBtn.on("click", next);
                $prevBtn.on("click", prev);

                scope.$on("$destroy", function () {
                    listener();
                    $nextBtn.off("click");
                    $prevBtn.off("click");
                });

                scope.$watch('stopLoadMore', function () {
                    if (!scope.stopLoadMore)
                    {
                        showLoadMore(false);
                    }
                });
            }
        };
    }];

    return directive;
});