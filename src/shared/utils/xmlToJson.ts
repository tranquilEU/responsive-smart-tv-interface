export const xmlToJson = (xml: Node): any => {
	// If it's an element node
	if (xml.nodeType === 1) {
		const obj: any = {};
		const element = xml as Element;

		// Handle attributes
		if (element.attributes.length > 0) {
			obj['@attributes'] = {};
			for (let i = 0; i < element.attributes.length; i++) {
				const attr = element.attributes.item(i)!;
				obj['@attributes'][attr.nodeName] = attr.nodeValue;
			}
		}

		// Handle children
		if (element.childNodes.length > 0) {
			for (let i = 0; i < element.childNodes.length; i++) {
				const child = element.childNodes.item(i);
				const childName = child.nodeName;

				const childObj = xmlToJson(child);

				if (child.nodeType === 3) {
					// Text node
					const text = child.nodeValue?.trim();
					if (text) {
						obj['#text'] = text;
					}
				} else {
					if (!obj[childName]) {
						obj[childName] = childObj;
					} else {
						// If multiple children with same name → array
						if (!Array.isArray(obj[childName])) {
							obj[childName] = [obj[childName]];
						}
						obj[childName].push(childObj);
					}
				}
			}
		}

		return obj;
	}

	// If it's a text node
	if (xml.nodeType === 3) {
		return (xml.nodeValue || '').trim();
	}

	return null;
};
