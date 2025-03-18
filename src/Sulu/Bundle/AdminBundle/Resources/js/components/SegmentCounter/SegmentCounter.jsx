"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const Translator_1 = require("../../utils/Translator");
const segmentCounter_scss_1 = __importDefault(require("./segmentCounter.scss"));
class SegmentCounter extends react_1.default.Component {
    render() {
        const { delimiter, max, value } = this.props;
        const segmentsCount = value ? value.split(delimiter).length : 0;
        const segmentsLeft = max - segmentsCount;
        const segmentsLeftLabelClass = (0, classnames_1.default)(segmentCounter_scss_1.default.segmentCounter, {
            [segmentCounter_scss_1.default.exceeded]: segmentsLeft && segmentsLeft < 0,
        });
        return (<label className={segmentsLeftLabelClass}>
                {segmentsLeft} {(0, Translator_1.translate)('sulu_admin.segments_left')}
            </label>);
    }
}
exports.default = SegmentCounter;
