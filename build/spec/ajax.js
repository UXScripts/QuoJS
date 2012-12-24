
describe("Ajax", function() {
  var service_url;
  service_url = void 0;
  beforeEach(function() {
    return service_url = "http://quonasrv.appspot.com/api/";
  });
  it("can configure ajax settings", function() {
    $$.ajaxSettings = {
      async: false,
      success: {},
      error: {},
      timeout: 0
    };
    return expect($$.ajaxSettings.async).toBeFalsy();
  });
  it("can call ajax", function() {
    spyOn($$, "ajax");
    $$.ajax({
      url: "" + service_url + "user/login"
    });
    return expect($$.ajax.mostRecentCall.args[0]["url"]).toEqual("" + service_url + "user/login");
  });
  it("should execute the callback function on success", function() {
    var _callback;
    spyOn($$, "ajax").andCallFake(function(options) {
      return options.success();
    });
    _callback = jasmine.createSpy();
    $$.ajax({
      url: "" + service_url,
      success: _callback
    });
    return expect(_callback).toHaveBeenCalled();
  });
  return it("can serialize parameters", function() {
    var parameters, serializedParameters;
    parameters = {
      format: 'json',
      key: '1980',
      page: 0,
      ordered: true
    };
    serializedParameters = "format=json&key=1980&page=0&ordered=true";
    return expect($$.serializeParameters(parameters)).toBe(serializedParameters);
  });
});
