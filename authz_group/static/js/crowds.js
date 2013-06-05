(function($) {
    $.fn.crowd_control = function(options) {
        var opts = $.extend( { group_ids: [] }, options);

        return this.each(function() {
            initialize_crowds($(this));
        });
    };

    function handle_cc_click() {
        console.log(this);
        $(this).trigger('cancel');
    }

    function initialize_crowds(instance) {
        instance.addClass("crowd_control");
        instance.addClass("cc_loading");

        instance.on("click", handle_cc_click);

        $.ajax('/crowds/rest/v1/groups', {
            success: function(data) { group_data_success(instance, data); }
        });
    };

    function group_data_success(instance, data) {
        var len = data.length;
        for (var i = 0; i < len; i++) {
            var instance_data = data[i];

            var new_div = $("<div />");

            new_div.addClass("cc_type_"+instance_data.source_type);
            new_div.addClass("cc_id_"+instance_data.source_key);

            if (instance_data["implementation"]["name"]) {
                new_div.text(instance_data["implementation"]["name"]);
            }
            instance.append(new_div);
        }

        instance.removeClass("cc_loading");
    };

}(jQuery));



