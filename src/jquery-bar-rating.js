function init(Survey) {
    var widget = {
        name: "barrating",
        title: "Bar rating",
        iconName: "icon-barrating",
        widgetIsLoaded: function() { return !!$.fn.barrating; },
        defaultJSON: {choices: [1, 2, 3, 4, 5]},
        isFit : function(question) { return typeof $ == 'function' && !!$.fn.barrating; },
        isDefaultRender: true,
        activatedByChanged: function(activatedBy) {
            Survey.JsonObject.metaData.addClass("barrating", [ {name: "showValues:boolean", default: false}, 
            {name:"hasOther", visible: false}, {name: "otherText", visible: false}, {name: "optionsCaption", visible: false}, 
            {name: "otherErrorText", visible: false}, {name: "storeOthersAsComment", visible: false}, {name: "renderAs", visible: false}], null, "dropdown");
            Survey.JsonObject.metaData.addProperty("barrating", {name: "ratingTheme", default: "fontawesome-stars", choices: ["fontawesome-stars", "css-stars", "bars-pill", "bars-1to10", "bars-movie", "bars-square", "bars-reversed", "bars-horizontal", "bootstrap-stars", "fontawesome-stars-o"]});
        },
        afterRender: function(question, el) {
            var $el = $(el).is("select") ? $(el) : $(el).find("select");
            $el.barrating('show', {
                theme: question.ratingTheme,
                initialRating: question.value,
                showValues: question.showValues,
                showSelectedRating: false,
                onSelect: function(value, text) {
                    question.value = value;
                }
            });
            question.valueChangedCallback = function() {
                $(el).find('select').barrating('set', question.value);
            }
        },
        willUnmount: function(question, el) {
            var $el = $(el).find("select");
            $el.barrating('destroy');
        } 
    }

    Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "customtype");
}

if (typeof Survey !== "undefined") {
    init(Survey);
}

export default init;