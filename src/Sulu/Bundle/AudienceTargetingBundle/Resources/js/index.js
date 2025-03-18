"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const containers_1 = require("sulu-admin-bundle/containers");
const services_1 = require("sulu-admin-bundle/services");
const TargetGroupRules_1 = __importDefault(require("./containers/Form/fields/TargetGroupRules"));
const ruleRegistry_1 = __importDefault(require("./containers/TargetGroupRules/registries/ruleRegistry"));
const ruleTypeRegistry_1 = __importDefault(require("./containers/TargetGroupRules/registries/ruleTypeRegistry"));
const KeyValue_1 = __importDefault(require("./containers/TargetGroupRules/ruleTypes/KeyValue"));
const Input_1 = __importDefault(require("./containers/TargetGroupRules/ruleTypes/Input"));
const SingleSelect_1 = __importDefault(require("./containers/TargetGroupRules/ruleTypes/SingleSelect"));
const SingleSelection_1 = __importDefault(require("./containers/TargetGroupRules/ruleTypes/SingleSelection"));
services_1.initializer.addUpdateConfigHook('sulu_audience_targeting', (config, initialized) => {
    if (initialized || !config) {
        return;
    }
    ruleRegistry_1.default.setRules(config.targetGroupRules);
    containers_1.fieldRegistry.add('target_group_rules', TargetGroupRules_1.default);
    ruleTypeRegistry_1.default.add('key_value', KeyValue_1.default);
    ruleTypeRegistry_1.default.add('input', Input_1.default);
    ruleTypeRegistry_1.default.add('single_select', SingleSelect_1.default);
    ruleTypeRegistry_1.default.add('single_selection', SingleSelection_1.default);
});
