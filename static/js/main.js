(function() {
	scrollToBottom();
	formSubmit();
})()

function formSubmit(e) {
	let form = document.forms.asyncForm;

	if (!form) return

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		let data = []

		let elements = form.elements;
		for (let i = 0; i < elements.length; i++) {
			if (elements[i].name.length) {
				data.push(`${elements[i].name}: ${elements[i].value}`);
			}
		}

		console.log('===== RESULT FORM =====');
		console.log(data.join('\n'));
	}, false);
}

function scrollToBottom() {
	let objDiv = document.getElementById("history");
	if (objDiv) {
		objDiv.scrollTop = objDiv.scrollHeight;
	}
}