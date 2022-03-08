var partyNum = 0;
var results = [];

function modifyPartyHtml(index, elem) {
	var delta = '?';
	var rank = ' ';
	var seed = ' ';

	if (partyNum > 0) {
		var handle = $(elem).find("td:eq(1)").find("a").last().html();
		if (handle) {
			handle = handle.replace('<span class="legendary-user-first-letter">','');
			handle = handle.replace('</span>','');
			if (handle in results) {
				delta = results[handle].delta;
				rank = results[handle].rank;
				seed = results[handle].seed;
			}
		}
	}

	var darkClass = "";
	if (partyNum % 2 == 1) {
		darkClass = "dark ";
	}
	var text;
	if (partyNum == 0) {
		text = "<th class='top right' style='width: 4em;'><span title='Rating change''>&Delta;</span></th>";
	} else {
		if (delta > 0) {
			text = "<td class='" + darkClass + "right'><span style='color:green;font-weight:bold;'>+" + delta  "</span></td>";
		} else {
			text = "<td class='" + darkClass + "right'><span style='color:gray;font-weight:bold;'>" + delta  "</span></td>"
		}
	}}

	partyNum++;
	$(elem).append(text);
}

function showDeltas() {
	var count = $(".standings").find("tr").length;
	if (count > 2) {
		var contestId = document.location.href.replace(/\D+/ig, ',').substr(1).split(',')[0];
		var contestants = document.getElementsByClassName("contestant-cell");
		var contestantsHandles = Array.from(contestants).map(x => x.innerText.trim());

		
	}
}

function parseDeltas(data, callback) {
    for (var i = 0; i < data.result.length; i++) {
        var handle = data.result[i].handle;
        var delta = data.result[i].newRating - data.result[i].oldRating;
		var rank = data.result[i].rank;
		var seed = data.result[i].seed;

		var res = {
    		delta : parseInt(delta),
	    	seed : parseInt(seed),
			rank : parseInt(rank)
		};

		results[handle] = res;
	}

	callback();
}




showDeltas();
