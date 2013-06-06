(function($) {
    var compiled_templates = {};

    $.fn.crowd_control = function(options) {
        var opts = $.extend( { group_ids: [] }, options);

        return this.each(function() {
            initialize_crowds($(this), opts);
        });
    };

    function handle_cc_click(ev) {
        var target_class = ev.target.className;

        if (target_class == "cc_cancel") {
            cancel_chooser($(this));
        }
        else if (target_class == "cc_save") {
            save_chooser($(this));
        }
    }

    function cancel_chooser(instance) {
        instance.trigger('cancel');
    }

    function save_chooser(instance) {
        var checked = instance.find("input.cc_crowd_select:checked");
        var checked_len = checked.length;

        var ids = [];
        for (var i = 0; i < checked_len; i++) {
            ids.push($(checked[i]).val());
        }
        instance.trigger('save', [ids]);
    }

    function initialize_crowds(instance, opts) {
        instance.addClass("crowd_control");
        instance.addClass("cc_loading");
        instance.data('selected_groups', opts.group_ids);

        instance.on("click", handle_cc_click);

        $.ajax('/crowds/rest/v1/groups', {
            success: function(data) { group_data_success(instance, data); }
        });
    };

    function group_data_success(instance, data) {
        var len = data.length;

        var selected_groups = instance.data()["selected_groups"];
        var group_lookup = {};
        for (var i = 0; i < selected_groups.length; i++) {
            group_lookup[selected_groups[i]] = true;
        }

        var group_data = data;

        for (var i = 0; i < group_data.length; i++) {
            if (group_lookup[group_data[i].id]) {
                group_data[i].selected = true;
            }
        }

        var template_data = {
            has_selected_groups: selected_groups.length,
            crowds: group_data
        };

        var template = get_compiled_template("cc_group_list");

        instance.html(template({ crowds: data }));

        instance.removeClass("cc_loading");
    };

    function get_compiled_template(id) {
        if (!compiled_templates[id]) {
            var source = $("#"+id).html();
            var template = Handlebars.compile(source);
            compiled_templates[id] = template;
        }

        return compiled_templates[id];
    }

}(jQuery));



