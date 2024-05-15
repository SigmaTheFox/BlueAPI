const { text } = require("./shiroko.json").parse;

function getStudent() {
	const {
		groups: { studentName },
	} = /class=\"character-name character-header\"\s?title=\".*\">(?<studentName>\w*\s?_?\(?\w*\)?)/gim.exec(
		text
	);

	const {
		groups: { studentRarity },
	} = /class=\"character-rarity\" data-value=\"(?<studentRarity>\d)/gim.exec(text);

	const {
		groups: { studentProfileImg },
	} =
		/data-title=\"Profile\s?Image[\"><a-z\s=\-:\/\.]*src=\"\/\/(?<studentProfileImg>[a-zA-Z\.\/0-9-_]*)/gim.exec(
			text
		);

	return {
		studentName,
		studentRarity,
		studentProfileImg: `https://${studentProfileImg}`,
	};
}

console.log(getStudent());
