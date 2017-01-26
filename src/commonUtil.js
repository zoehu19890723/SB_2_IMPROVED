import _ from 'underscore';
import {serviceImagePath} from './config';

export function compactDetail(data, struct, isgroup, generalID) {
	let new_form = cloneArray(struct);
	new_form.forEach((item, index) => {
		let code = item.field_code;
		let selectObj = _.find(data, {
			field_code: code
		});
		if ((generalID === undefined || generalID === null || generalID === '') && parseInt(item.permission_code) >= 3) {
			item.editAble = true;
		}
		item.value = ((selectObj === undefined || selectObj === null) ? null : selectObj.value);
		if (item.permission_code < 3 || isgroup === true) {
			item = convertType(item);
		}
	});
	return new_form;
};

export function compactGroupDetail(data, struct, generalID) {
	let result = [];
	let desObj = {};
	data.forEach((item, index) => {
		let groupdata = compactDetail(item.groupData, cloneArray(struct), true);
		desObj = {
			groupTitle: item.groupTitle || null,
			groupId: item.id || null,
			permission_code: item.permission_code,
			groupData: groupdata
		}
		result.push(desObj);
	})
	return result;
};

function cloneObj(old_obj) {
	let Constructor = old_obj.constructor;
	let obj = new Constructor();

	for (let attr in old_obj) {
		if (old_obj.hasOwnProperty(attr)) {
			if (typeof(old_obj[attr]) !== "function") {
				if (old_obj[attr] === null) {
					obj[attr] = null;
				} else {
					let type = typeof old_obj[attr];
					switch (type) {
						case 'object':
							{
								obj[attr] = cloneObj(old_obj[attr]);
								break;
							}
						case 'array':
							{
								obj[attr] = cloneArray(old_obj[attr]);
								break;
							}
						default:
							{
								obj[attr] = cloneCommon(old_obj[attr]);
								break;
							}
					}
				}
			}
		}
	}
	return obj;
};

function cloneArray(old_array) {
	let thisArr = old_array.valueOf();
	let newArr = [];
	for (let i = 0; i < thisArr.length; i++) {
		newArr.push(cloneObj(thisArr[i]));
	}
	return newArr;
};

function cloneCommon(old_value) {
	return old_value.valueOf();
};

function convertType(item) {
	if (item === null) {
		return null;
	}
	if (item.type !== undefined && item.type.input !== undefined && item.type.input !== null) {
		var type = item.type.input;
		switch (type) {
			case 'selector':
				{
					var avaliableValues = item.type.avaliableValue;
					var isNormal = false;
					for (var i = 0; i < avaliableValues.length; i++) {
						var temp_item = avaliableValues[i];
						if (typeof temp_item === 'object' && temp_item.value === item.value) {
							item.value = temp_item.display;
							isNormal = true;
							break;
						} else if (temp_item === item.value) {
							item.value = temp_item;
							isNormal = true;
							break;
						}
					}
					if (isNormal === false) {
						item.value = null;
					}
					break;
				}
			case 'checkbox':
				{
					if (item.value === 1 || item.value === '1') {
						item.value = getI18NText('checkboxT');
					} else {
						item.value = getI18NText('checkboxF');
					}
					break;
				}
		}
		return item;
	}
}

export function dealImage(array, withoutInfo) {
	if (array && array.length !== 0) {
		array.forEach(function(item, index) {
			let subItem = withoutInfo ? item : item.userInfo;
			if (subItem && subItem.image && subItem.image !== "" && subItem.image.indexOf(serviceImagePath) < 0) {
				let image = subItem.image.replace(/\s/g, '%20');
				subItem.image = serviceImagePath + image;

				if (withoutInfo) {
					item = subItem;
				} else {
					item.userInfo = subItem;
				}
			}
		});
	}
	return array;
}