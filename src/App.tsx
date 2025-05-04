import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { modeAtom, areaAtom, targetAtom, templateAtom } from './classes/stores';
import Areas from './components/Areas';
import Const from './classes/const';
import '@/App.css';
import drawMap from './classes/draw';
import { AreaId } from './classes/types';
import Sidebar from './components/Header';

const App: React.FC = () => {
  const [mode, setMode] = useAtom(modeAtom);
  const [area, setArea] = useAtom(areaAtom);
  const [target, setTarget] = useAtom(targetAtom);
  const [template, setTemplate] = useAtom(templateAtom);
  const worldInfos = Const.worldInfos;
  const worlds = worldInfos.find(item => item.mode_id === mode)!.worlds;

  const [memoText, setMemoText] = useState('項目をWクリックすると直接開きます');

  useEffect(() => {
    if (!template) return;

    const area_id = `${template.world}-${template.area}` as AreaId;
    drawMap(area_id, template.route);

    if (template.memo === null) {
      setMemoText('');
    } else if (template.memo) {
      setMemoText(template.memo);
    }
  }, [template]);

  return (
    <>
      <Sidebar />
      <div className="outer">
        <div className="main">
          <div className="upper">
            <div className="map">
              {template ? (
                <div className="cy" id="cy"></div>
              ) : (
                <span className="message">👇👇👇🙄👇</span>
              )}
            </div>
            <div className="info">
              {template && (
                <>
                  <p className="title">{template.title}</p>
                  <p>
                    <a
                      className="url"
                      href={`https://kc3kai.github.io/kancolle-replay/?s=${template.token}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {`https://kc3kai.github.io/kancolle-replay/?s=${template.token}`}
                    </a>
                  </p>
                  <div className="memo">
                    {memoText &&
                      memoText.split('$e').map((text, index) => (
                        <p key={index}>{text}</p>
                      ))}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="middle">
            <div className="area">
              {worlds.map((world, index) => (
                <span
                  key={index}
                  className="worlds"
                  style={{ backgroundColor: area === world ? '#dcefff' : '' }}
                  onMouseEnter={(e) => {
                    setArea(world);
                    setTarget(e.currentTarget);
                  }}
                  onMouseLeave={() => setArea(0)}
                >
                  {world}
                </span>
              ))}
            </div>
            <div className="mode-box">
              {worldInfos.map((worldInfo, index) => (
                <div
                  key={index}
                  className={`modes ${mode === worldInfo.mode_id ? 'mode-selected' : ''}`}
                  onMouseDown={() => setMode(worldInfo.mode_id)}
                >
                  {worldInfo.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Areas />
    </>
  );
};

export default App;
