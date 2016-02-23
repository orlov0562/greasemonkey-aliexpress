// ==UserScript==
// @name        ru.aliexpress.com
// @namespace   ru.aliexpress.com
// @include     http://ru.aliexpress.com/store/*
// @include     http://ru.aliexpress.com/item/*
// @include     http://ru.aliexpress.com/af/*
// @include     http://ru.aliexpress.com/wholesale*
// @include     http://shoppingcart.aliexpress.com/shopcart/shopcartDetail.htm
// @version     1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

$(function(){
  
  var updateSinglePrice = function(el){
    if (el.length>0) {
        var priceHtml = el.html();
        var priceCleaned = $(el).text().replace('US $','').replace(',','');
        if (priceCleaned.indexOf('-')>0) priceCleaned = priceCleaned.substring(0, priceCleaned.indexOf('-'));
        var price = parseFloat(priceCleaned.trim());
        var priceUAH = (price*27.5).toFixed(2);
        var priceSellUAH=(priceUAH*1.5).toFixed(2);
        el.html(priceHtml + ' <span style="font-size:12px; color:green;">&rArr; '+priceUAH+'грн <span style="color:gray;font-weight:normal;">[+50%&rarr;'+priceSellUAH+' грн]</span></span>');
    }
  };
  
  var updateSinglePrice2 = function(el){
    if (el.length>0) {
        var priceHtml = el.html();
        var priceCleaned = $(el).text().replace('US $','').replace(',','');
        if (priceCleaned.indexOf('-')>0) priceCleaned = priceCleaned.substring(0, priceCleaned.indexOf('-'));
        var price = parseFloat(priceCleaned.trim());
        var priceUAH = (price*27.5).toFixed(2);
        var priceSellUAH=(priceUAH*1.5).toFixed(2);
        el.html(priceHtml + ' <span style="font-size:12px; color:green;">&rArr; '+priceUAH+'грн<br><span style="color:gray;font-weight:normal;">[+50%&rarr;'+priceSellUAH+' грн]</span></span>');
    }
  };  

  var els = $('div.product-info-operation a.sku-value');
  if (els.length>0) {
      for (var i=0; i<els.length; i++) { 
         $(els[i]).click(function(){
           console.log('here');
           setTimeout(function(){
              updateSinglePrice($('#product-info-total-price span.total-price'));             
              updateSinglePrice($('span#sku-discount-price'));
             updateSinglePrice($('span#sku-price'));
           }, 500);
         });
      }
  }

  updateSinglePrice($('#product-info-total-price span.total-price'));
  updateSinglePrice($('span#sku-discount-price'));
  updateSinglePrice($('span#sku-price'));
  
  var els = $('ul.items-list div.cost b');
  if (els.length>0) {
      for (var i=0; i<els.length; i++) {
        updateSinglePrice($(els[i]));             
      }
  }
  
  var els = $('li.list-item span.price span.value');
  if (els.length>0) {
      for (var i=0; i<els.length; i++) {
        updateSinglePrice($(els[i]));             
      }
  }  
  
  var els = $('td.product-price span.value');
  if (els.length>0) {
      for (var i=0; i<els.length; i++) {
        updateSinglePrice2($(els[i]));             
      }
  }    

});
