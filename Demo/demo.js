/*
	Before the page loads, we create a bsService object. Do not change the name - that will break stuff :(
		The arguments passed in are a list of strings. Each string is an extensionID. these particular ID's are
		for the released version of the IdeaMACHE plugin and for a secret, special version of the extension
		that I have
	bsService will see if any of the extenions are availabe. If so it will use them. Otherwise, it will rely on the
		web-hosted version of bigsemantics

	 */

var bsService = new BSAutoSwitch(['elkanacmmmdgbnhdjopfdeafchmhecbf', 'gdgmmfgjalcpnakohgcfflgccamjoipd ']);

/*
Called on the rendering demo page
*/
function onLoadRendering(containerID, url)
{
	/*
	Let's break down the arguments.
		-container: whatever HTML node you want to dump the rendering into
		-url: the URL you want a metadataRendering of.
		-null: if you already have metadata, you can pass it in as a clipping here. You don't really need to worry about this
				unless you're doing something quite complicated.
		-MICE.render: the prefered rendering function. IE: it's what will be called after BigSemantics finishes extracting
					  metadata and mmd. You can supply your own for fun and profit!
		-options: you can set some additional parameters here. The big one is options.callback,
					which you can use if for some reason you need access to the metadata and meta-metadata

					If what you really want is access to that sweet MetadataViewModel, see the "Custom Rendering" demo
	*/
	var container = document.getElementById(containerID);
	var options = {};
	options.callback = swizzIt;

	RendererBase.addMetadataDisplay(container, url, null, MICE.render, options);
}

/*
	In a callback passed through via options, you are given access to metadata and the meta-metadata.
	You can probably ignore the meta-metadata.
*/
function swizzIt(metadataAndMetametaData)
{
	//To make metadata easier to use via js, first unwrap it (it's initially wrapped for cross-compatibility with C#)
	var unwrappedMetadata = BSUtils.unwrap(metadataAndMetametaData.metadata);
	//using unwrapped metadata is super easy and all the cool kids do it
		//never trust metadata! Like file I/O you should wrap it try catch statements
	try{
		var textOutput = "And it's only " + unwrappedMetadata.price + "! (ps - a callback made me)";
		var textNode = document.createTextNode(textOutput);
		var textHold = document.getElementById('priceOutput');
		textHold.appendChild(textNode)

	}catch(e){
		var textOutput = "no price found (ps - a callback made me)";
		var textNode = document.createTextNode(textOutput);
		var textHold = document.getElementById('priceOutput');
		textHold.appendChild(textNode)

	}
}

/*
Called on the data-only page
*/
function onLoadSemantics(url)
{
	/*
	Let's break down the arguments.
		-url: the URL you want metadata for
		-options: If you already have meta-metadata, you can pass it in here so prevent double extraction.
		-callback: your function that will asynchronously recieve metadata
	*/

	var options = {};
	var callback = gagaOhLala;
	bsService.loadMetadata(url, options, callback);
}

// Ignore this. I just use it to make numbers slightly prettier -- visciously copy-pasted from stack overflow:
// http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas(x)
{
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


//The first argument passed to callback is an error message. in this case its null <3
function gagaOhLala(err, metadataAndMetametaData)
{
	//To make metadata easier to use via js, first unwrap it (it's initially wrapped for cross-compatibility with C#)
	var unwrappedMetadata = BSUtils.unwrap(metadataAndMetametaData.metadata);
	
	//Before using the data, i kill off my loading indicator
	document.getElementById('loadingGifOfDoom').parentElement.removeChild(document.getElementById('loadingGifOfDoom'));

	//we create a node to hold the linked image
	//never trust metadata! Like file I/O you should wrap it try catch statements
	try{
		var youtubeThumbnail = document.createElement('img');
		youtubeThumbnail.className = "youtubeThumbnail"
		youtubeThumbnail.src = unwrappedMetadata.pic;
		//This lovely BSUtils function takes a machete to special characters.
		var neatlyFormattedViewCount = BSUtils.removeLineBreaksAndCrazies(unwrappedMetadata.number_of_views);
		numberWithCommas(neatlyFormattedViewCount);
		var textOutput = "Viewed over " + neatlyFormattedViewCount + " times!";
		var textNode = document.createTextNode(textOutput);

		var imageCont = document.getElementById('imageCont');
		imageCont.addEventListener('click',function(){
			var locationWithTime = unwrappedMetadata.location + "&t=7m2s";
			window.open(locationWithTime,'_blank');

		})
		imageCont.appendChild(youtubeThumbnail);
		var viewCont = document.getElementById('viewCont');
		viewCont.appendChild(textNode);

	}catch(e){
		var textOutput = "the youtube wrapper is experiencing problems, sorry :(";
		var textNode = document.createTextNode(textOutput);
		var textHold = document.getElementById('priceOutput');
		textHold.appendChild(textNode)

	}
}
