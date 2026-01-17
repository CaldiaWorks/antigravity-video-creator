"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const player_1 = require("@remotion/player"); // Remotion Playerのインポート
require("./App.css");
const MyComp = () => {
    return (<div style={{ flex: 1, textAlign: 'center', fontSize: '2em', color: 'white' }}>
			<h1>Hello Remotion in VS Code!</h1>
		</div>);
};
function App() {
    return (<div className="App">
			<player_1.Player component={MyComp} durationInFrames={120} compositionWidth={1920} compositionHeight={1080} fps={30} style={{
            width: '100%',
            maxWidth: '800px',
        }} controls/>
		</div>);
}
exports.default = App;
//# sourceMappingURL=App.js.map