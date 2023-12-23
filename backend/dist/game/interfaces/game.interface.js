"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = exports.Status = void 0;
var Status;
(function (Status) {
    Status["Win"] = "win";
    Status["Lose"] = "lose";
})(Status || (exports.Status = Status = {}));
var State;
(function (State) {
    State[State["WAITING"] = 0] = "WAITING";
    State[State["SETTING_UP"] = 1] = "SETTING_UP";
})(State || (exports.State = State = {}));
//# sourceMappingURL=game.interface.js.map