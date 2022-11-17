const tooltips = document.querySelectorAll('.initTooltip');
if (tooltips.length > 0) {
	let screenWidth = window.innerWidth, screenHeight = window.innerHeight;

	window.onresize = () => {
		screenWidth = window.innerWidth;
		screenHeight = window.innerHeight;
	};

	tooltips.forEach((tooltip) => {
		tooltip.addEventListener('mouseenter', (event) => {
			event.preventDefault();
			event.stopPropagation();
			let tooltip = {
				elm: event.target,
				content: event.target.getAttribute('data-content'),
				position: event.target.getBoundingClientRect()
			}

			let template_tooltip = document.getElementsByClassName('template-tooltip');
			if (template_tooltip.length) {
				template_tooltip[0].remove();
			}
			document.body.insertAdjacentHTML('beforeend', templateTooltip(tooltip.content));
			template_tooltip[0].classList.add('show');
			handlePositionElement(tooltip.position, tooltip.elm, template_tooltip);
		});
	});

	let templateTooltip = (content) => `<div class="template-tooltip">
											<div class="template-tooltip_inner">
												<div class="template-tooltip_arrow"></div>
												<div class="template-tooltip_content">${content}</div>
											</div>
										</div>`;

	let handlePositionElement = (position, elm, template_tooltip) => {
		let ratioPositionY = position.top / screenHeight, ratioPositionX = position.left / screenWidth,
			elmHeight = elm.offsetHeight, styleY = 'top:' + (position.top - elmHeight - 20) + 'px;',
			styleX = 'left:' + position.left + 'px;';

		template_tooltip[0].setAttribute('data-placement-y', 'top');
		template_tooltip[0].setAttribute('data-placement-x', 'left');

		if (ratioPositionY <= 0.115) {
			template_tooltip[0].setAttribute('data-placement-y', 'bottom');
			styleY = 'top:' + (position.top + elmHeight + 12) + 'px;';
		}

		if (ratioPositionX > ((screenWidth > 992) ? 0.8 : 0.5)) {
			template_tooltip[0].setAttribute('data-placement-x', 'right');
			styleX = 'right:' + (screenWidth - position.right) + 'px;';
		}

		template_tooltip[0].style.cssText = styleX + styleY;
	}

	document.addEventListener('mousemove', (event) => {
		let template_tooltip = document.getElementsByClassName('template-tooltip');
		if (template_tooltip.length > 0) {
			if (event.target.classList.contains('initTooltip') === false && template_tooltip[0].contains(event.target) === false) {
				template_tooltip[0].remove();
			}
		}
	});
}