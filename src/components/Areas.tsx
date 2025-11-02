import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { modeAtom, areaAtom, targetAtom, templateAtom } from '@/classes/stores';
import '@/App.css';
import templates from '@/data/template';
import vangards from '@/data/vangard';
import { Ttemplate } from '@/classes/types';

const Areas: React.FC = () => {
  const [mode] = useAtom(modeAtom);
  const [area, setArea] = useAtom(areaAtom);
  const [target] = useAtom(targetAtom);
  const [, setTemplate] = useAtom(templateAtom);

  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!target) return;
    
    const rect = target.getBoundingClientRect();
    setPosition({
      top: rect.bottom, // targetの下端
      left: rect.left, // targetの左端
    });
  }, [area, mode, target]);

  if (!area) return;

  let items = [] as Ttemplate[];

  switch (mode) {
    case 'nomal':
      items = templates.filter(item => item.world === area);
      break;
    case 'vanguard':
      items = vangards.filter(item => item.world === area);
      break;
    case 59:
    case 60:
    case 61:
      items = templates.filter(item => item.world === mode && item.area === area);
      break;
  } // @expansion

  const openUrl = (template: Ttemplate) => {
    window.open(
      `https://kc3kai.github.io/kancolle-replay/?s=${template.token}`
      , "_blank"
    );
  };

  return (
    <>
      <div
        className="select-menu"
        style={{top: position.top, left: position.left}}
        onMouseEnter={() => setArea(area)}
        onMouseLeave={() => setArea(0)}
      >
        {items.map((item) => (
          <p
            className="items"
            onMouseDown={() => setTemplate(item)}
            onDoubleClick={() => openUrl(item)}
          >
            {item.title}
          </p>
        ))}
      </div>
    </>
  )
}

export default Areas;