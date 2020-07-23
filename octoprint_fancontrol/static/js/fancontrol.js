$(function() {
    function FanControlViewModel(parameters) {
        var self = this;

        self.global_settings = parameters[0];
        self.settings = undefined;
        self.loginState = parameters[1];
        self.isFanOn = ko.observable(undefined);
        self.fan_indicator = undefined;

        self.onAfterBinding = function() {
            self.settings = self.global_settings.settings.plugins.fancontrol;

            self.fan_indicator = $("#fancontrol_indicator");
        };

        self.onDataUpdaterPluginMessage = function(plugin, data) {
            if (plugin != "fancontrol") {
                return;
            }

            self.isFanOn(data.isFanOn);

            if (self.isFanOn()) {
                self.fan_indicator.addClass("spin");
            } else {
                self.fan_indicator.removeClass("spin");
            }

        };

        self.toggleFan = function() {
            if (self.isFanOn()) {
                self.turnFanOff();
            } else {
                self.turnFanOn();
            }
        };

        self.turnFanOn = function() {
            $.ajax({
                url: API_BASEURL + "plugin/fancontrol",
                type: "POST",
                dataType: "json",
                data: JSON.stringify({
                    command: "turnFanOn"
                }),
                contentType: "application/json; charset=UTF-8"
            })
        };

    	self.turnFanOff = function() {
            $.ajax({
                url: API_BASEURL + "plugin/fancontrol",
                type: "POST",
                dataType: "json",
                data: JSON.stringify({
                    command: "turnFanOff"
                }),
                contentType: "application/json; charset=UTF-8"
            })
        };   
    }

    ADDITIONAL_VIEWMODELS.push([
        FanControlViewModel,
        ["settingsViewModel", "loginStateViewModel"],
        ["#navbar_plugin_fancontrol"]
    ]);
});