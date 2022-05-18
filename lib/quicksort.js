"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sort = void 0;
const asyncOperate = globalThis.requestAnimationFrame || globalThis.setImmediate || globalThis.setTimeout;
const immediate = () => new Promise(asyncOperate);
const DEFAULT_AWAIT_SIZE = 10000;
function swap(items, left, right) {
    const temp = items[left];
    items[left] = items[right];
    items[right] = temp;
}
function partition(items, compare, left, right) {
    const pivot = items[Math.floor((right + left) / 2)]; // eslint-disable-line no-magic-numbers
    let i = left;
    let j = right;
    while (i <= j) {
        while (compare(items[i], pivot) < 0) {
            i++;
        }
        while (compare(items[j], pivot) > 0) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j);
            i++;
            j--;
        }
    }
    return i;
}
function quickSort(items, compare, left, right, size) {
    return __awaiter(this, void 0, void 0, function* () {
        let index;
        if (items.length > 1) {
            index = partition(items, compare, left, right);
            if (Math.abs(left - right) > size) {
                yield immediate();
            }
            if (left < index - 1) {
                yield quickSort(items, compare, left, index - 1, size);
            }
            if (index < right) {
                yield quickSort(items, compare, index, right, size);
            }
        }
        return items;
    });
}
function sort(arr, compare, size = DEFAULT_AWAIT_SIZE) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(arr instanceof Array)) {
            throw new TypeError('First argument must be an array');
        }
        if (!(compare instanceof Function)) {
            throw new TypeError('Second argument must be a function');
        }
        return quickSort(arr, compare, 0, arr.length - 1, size);
    });
}
exports.sort = sort;
