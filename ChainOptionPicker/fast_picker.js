// modules loading
const Scene = require('Scene');
const Textures = require('Textures');
const Materials = require('Materials');
const NativeUI = require('NativeUI');
const Patches = require('Patches');
const Animation = require('Animation');
const D = require('Diagnostics');

Textures.findUsingPattern('picker*').then(function(r){
    return r.sort(function(a, b){ return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;});
}).then(function(r){
    D.log(r.length)
    var startIndex = 0;
    const picker = NativeUI.picker; 
    const slider = NativeUI.slider;
    const itemz = []
        
    for (var i = 0; i < r.length; i++){
        itemz.push({image_texture: r[i]})
    }
    var configuration1 = { 
        selectedIndex: startIndex, 
        items: itemz
    };
    var configuration0 = { 
        selectedIndex: startIndex, 
        items: []
    };

    
    picker.configure(configuration1);
    //slider.visible = false;
    
    picker.visible = true;

    var tD = Animation.timeDriver({durationMilliseconds: 900, loopCount: 1, mirror: false});
    var opacityAnim = Animation.animate(tD, Animation.samplers.linear(1, 0));

    
    picker.selectedIndex.monitor().subscribe(function(index) {

        Patches.inputs.setScalar('picker', index.newValue);
        Patches.inputs.setScalar('opacity', opacityAnim);
        tD.reset();
        tD.start();
        
    });
    slider.value.monitor({fireOnInitialValue: true}).subscribe(function(val) {
        Patches.inputs.setScalar('slider', val.newValue);
    });

})
