$(function () {
	// load pois from json
	importPoi();

	generateSZ();
	$("#poi").on("change", generateSZ);
	$("#custom_poi").on("input", generateSZ);
	$("#distance").on("input", generateSZ);

	let latestCopyData;
	$("button.copy").on("click", function () {
		let btn = $(this);
		let isDone = btn.hasClass("done");
		let isAll = btn.hasClass("all");
		let isLine1 = btn.hasClass("line1");
		let isLine2 = btn.hasClass("line2");

		let textLine1 = $(`#text-${isDone ? "done" : "new"} p.line1`).text();
		let textLine2 = $(`#text-${isDone ? "done" : "new"} p.line2`).text();

		let text = "";
		if (isAll) {
			text = `${textLine1} ${textLine2}`;
		} else if (isLine1) {
			text = textLine1;
		} else if (isLine2) {
			text = textLine2;
		}

		copyToClipboard(text);
	});
});

function generateSZ() {
	var poi = $("#poi").val();
	var distance = $("#distance").val();

	if (distance >= 1000) {
		distance = (distance / 1000).toFixed(0) + "km";
	} else {
		distance = (distance || 150) + "m";
	}

	if (poi === "custom_poi") {
		$("#custom_poi").show();
		poi = $("#custom_poi").val() || "Eigener Ort";
	} else {
		$("#custom_poi").hide();
	}

	$(".text_poi").text(poi);
	$(".text_distance").text(distance);

	let text1 = `${$("#text-new p.line1").text()} ${$("#text-new p.line2").text()}`;
	$("p.count.text-new").text(text1.length);

	if (text1.length > 100) {
		$("#text-new").addClass("limited");
		$("button.copy.all.new").attr("disabled", true);
	} else {
		$("#text-new").removeClass("limited");
		$("button.copy.all.new").attr("disabled", false);
	}

	let text2 = `${$("#text-done p.line1").text()} ${$("#text-done p.line2").text()}`;
	$("p.count.text-done").text(text2.length);

	if (text2.length > 100) {
		$("#text-done").addClass("limited");
		$("button.copy.all.done").attr("disabled", true);
	} else {
		$("#text-done").removeClass("limited");
		$("button.copy.all.done").attr("disabled", false);
	}
}

function copyToClipboard(text) {
	navigator.clipboard
		.writeText(text)
		.then(() => {
			Toastify({
				text: `Text in Zwischenablage kopiert.`,
				className: "toasted",
				duration: 10000,
				close: true,
				gravity: "top",
				position: "right",
				stopOnFocus: true,
				onClick: function () {},
			}).showToast();
		})
		.catch((err) => console.error("Failed to copy to clipboard: ", err));
}

function importPoi() {
	$.getJSON("assets/poi.json", function (data) {
		var select = $("#poi");

		$.each(data, function (optgroupLabel, options) {
			var optgroup = $("<optgroup>").attr("label", optgroupLabel);

			$.each(options, function (index, option) {
				var optionElement = $("<option>").attr("value", option.value).text(option.text);
				optgroup.append(optionElement);
			});

			select.append(optgroup);
		});
	});
}
