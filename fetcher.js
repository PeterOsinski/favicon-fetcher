var http 		= require('http');
var https 		= require('https');
var _ 			= require('underscore');
var urlParser	= require('url');
var provider 	= require('./provider.js');

var start = (new Date).getTime();
var chunksNum = 0;
var favicon;

provider(function(urls){

	_.each(urls, function(url){
		
		url = urlParser.parse(url);

		if(!url || (url.protocol !== 'http:' && url.protocol !== 'https:')){
			return;
		}else{
			url = url.href;
		}

		var req = http;

		if(url.indexOf('https://') === 0){
			req = https;
		}

		req.get(url, function(res){
		  res.on('data', function(chunk){
		  	chunksNum++;
		  	if(!chunk){
		  		return;
		  	}

		    var match = chunk.toString().match(/rel="(shortcut|icon|shortcut icon)".*href="([^"]+)"/ig);

		    if(match && match.length > 0){
		    	var match = match[0].match('href="([^"]+)"');

		    	if(match && match.length == 0 || !match){
		    		return;
		    	}

		    	favicon = match[0].replace('href="', '').replace('"','');

		    	res.destroy();
		    }
		  });

		}).on('close', function(){
			console.log(chunksNum);
			console.log(favicon);
			console.log((new Date).getTime() - start + 'ms');

		}).on('error', function(error){

			console.log('ERROR - ' +error);

		});

	})

})

