let tooltips = document.getElementsByClassName('initTooltip');
if (tooltips.length > 0) {
	let index = 0;
	for (index; index < tooltips.length; index++) {

		let tooltip_id = '#' + tooltips[index].getAttribute('id');
		let tooltip_content = tooltips[index].getAttribute('data-content');
		let tooltip_template = document.getElementById(tooltips[index].getAttribute('data-template'));

		if (tooltip_content.length === 0 && tooltip_template !== undefined) {
			tooltip_content = tooltip_template;
			tooltip_content.style.display = "block";
		}

		tippy(tooltip_id, {
			content: tooltip_content,
			interactive: true,
			allowHTML: true,
		});
	}
}