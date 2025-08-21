import { useEffect, useMemo, useState } from "react";

function Lightbox({ photo, onClose }) {
  const [visible, setVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.documentElement.classList.add("overflow-hidden");
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, [onClose]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="fixed inset-0 z-[200]" role="dialog" aria-modal="true">
      <div
        className={`absolute inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div
          className={`relative max-w-4xl w-full rounded-2xl overflow-hidden border border-white/10 bg-white dark:bg-slate-900 shadow-2xl transition-transform duration-200 ease-out ${
            visible ? "scale-100" : "scale-95"
          }`}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 inline-flex items-center rounded-xl px-4 py-2 text-sm font-semibold bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 text-slate-900 dark:text-white shadow-lg border border-slate-200 dark:border-slate-600 backdrop-blur-sm transition-all duration-200"
          >
            ✕ Close
          </button>
          
          {/* Loading state */}
          {!imageLoaded && (
            <div className="flex items-center justify-center h-64 bg-slate-100 dark:bg-slate-800">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto mb-4"></div>
                <p className="text-slate-600 dark:text-slate-400">Loading image...</p>
              </div>
            </div>
          )}
          
          <img 
            src={photo.src} 
            alt={photo.title} 
            className={`w-full h-auto max-h-[60vh] object-contain transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="eager" 
            decoding="async"
            onLoad={handleImageLoad}
            style={{ display: imageLoaded ? 'block' : 'none' }}
          />
          
          <div className="p-4">
            <div className="font-semibold">{photo.title}</div>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{photo.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GalleryHidden({ onBack }) {
  const [selected, setSelected] = useState(null);
  const photos = useMemo(() => [
    {
      src: "/src/assets/night.jpeg",
      thumb: "/src/assets/night.jpeg",
      title: "Night Vibes",
      description: "Beautiful night moments captured in time."
    },
    {
      src: "/src/assets/happy.jpeg",
      thumb: "/src/assets/happy.jpeg",
      title: "Happy Times",
      description: "Joyful memories that bring smiles to faces."
    },
    {
      src: "/src/assets/look.jpeg",
      thumb: "/src/assets/look.jpeg",
      title: "Perfect Look",
      description: "Capturing the essence of beauty and grace."
    },
    {
      src: "/src/assets/she.jpeg",
      thumb: "/src/assets/she.jpeg",
      title: "She",
      description: "A moment of elegance and charm."
    },
    {
      src: "/src/assets/cutie.jpeg",
      thumb: "/src/assets/cutie.jpeg",
      title: "Cutie",
      description: "Adorable moments that warm the heart."
    },
    {
      src: "/src/assets/boii.jpeg",
      thumb: "/src/assets/boii.jpeg",
      title: "Boii",
      description: "Cool vibes and confident energy."
    },
    {
      src: "/src/assets/Yeh.jpeg",
      thumb: "/src/assets/Yeh.jpeg",
      title: "Yeh",
      description: "Special moments worth remembering."
    },
    {
      src: "/src/assets/Us.jpeg",
      thumb: "/src/assets/Us.jpeg",
      title: "Us",
      description: "Together we create beautiful memories."
    }
  ], []);

  const tree = useMemo(() => {
    const groupA = photos.slice(0, 2);
    const groupB = photos.slice(2, 4);
    const groupC = photos.slice(4, 6);
    const groupD = photos.slice(6, 8);
    return {
      title: "Hidden Album",
      src: photos[0]?.src,
      description: "Root collection",
      children: [
        {
          title: "Memories",
          src: groupA[0]?.src,
          description: "Beautiful moments captured",
          children: groupA.map((p) => ({ ...p })),
        },
        {
          title: "Joy",
          src: groupB[0]?.src,
          description: "Happy times and smiles",
          children: groupB.map((p) => ({ ...p })),
        },
        {
          title: "Elegance",
          src: groupC[0]?.src,
          description: "Grace and beauty",
          children: groupC.map((p) => ({ ...p })),
        },
        {
          title: "Special",
          src: groupD[0]?.src,
          description: "Unique and precious moments",
          children: groupD.map((p) => ({ ...p })),
        },
      ],
    };
  }, [photos]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && !selected) onBack();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onBack, selected]);

  return (
    <div className="min-h-screen bg-blue-50 text-slate-900 dark:bg-blue-50 dark:text-slate-900 relative overflow-hidden">
      <CursorHearts />
      <header className="sticky top-0 z-30 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/80 backdrop-blur px-4 py-3 shadow-sm">
          <div className="font-semibold">Secret Gallery</div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-brand-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow hover:shadow-md transition-shadow"
          >
            ← Back
          </button>
        </div>
      </header>
      <main className="py-8 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Photo Album</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            A hidden collection with captions for each image.
          </p>
          <div className="mt-8">
            <PhotoTree photos={photos} onSelect={(p) => setSelected(p)} />
          </div>
        </div>
      </main>
      {selected ? (
        <Lightbox photo={selected} onClose={() => setSelected(null)} />
      ) : null}
    </div>
  );
}

function Tree({ node, onSelectPhoto }) {
  return (
    <ul className="space-y-4">
      <TreeNode node={node} onSelectPhoto={onSelectPhoto} depth={0} />
    </ul>
  );
}

function TreeNode({ node, onSelectPhoto, depth }) {
  const [open, setOpen] = useState(true);
  const isLeaf = !node.children || node.children.length === 0;
  const handleClick = () => {
    if (isLeaf) onSelectPhoto(node);
    else setOpen((v) => !v);
  };
  return (
    <li className="relative">
      <div
        className={`flex items-center gap-3 rounded-xl border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur p-3 ${
          isLeaf ? "cursor-pointer" : "cursor-default"
        }`}
        onClick={handleClick}
      >
        <div className="flex-none">
          {!isLeaf ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen((v) => !v);
              }}
              className="mr-1 inline-flex h-7 w-7 items-center justify-center rounded-lg border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-white/10"
              aria-label={open ? "Collapse" : "Expand"}
            >
              <span className={`transition-transform ${open ? "rotate-90" : "rotate-0"}`}>▶</span>
            </button>
          ) : (
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-transparent">•</span>
          )}
        </div>
        <img
          src={node.src}
          alt={node.title}
          className="h-12 w-12 rounded-lg object-cover flex-none"
          draggable="false"
        />
        <div className="min-w-0">
          <div className="font-semibold truncate">{node.title}</div>
          <div className="text-xs text-slate-600 dark:text-slate-300 truncate">
            {isLeaf ? node.description : `${node.children.length} items · ${node.description}`}
          </div>
        </div>
      </div>
      {node.children && open ? (
        <ul className="mt-3 ml-6 border-l border-slate-300/60 pl-4 space-y-3">
          {node.children.map((child) => (
            <TreeNode key={child.src + child.title} node={child} onSelectPhoto={onSelectPhoto} depth={depth + 1} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

function PhotoTree({ photos, onSelect }) {
  const points = useMemo(
    () => [
      { left: "18%", top: "62%" },
      { left: "26%", top: "50%" },
      { left: "34%", top: "40%" },
      { left: "46%", top: "27%" },
      { left: "54%", top: "19%" },
      { left: "66%", top: "32%" },
      { left: "74%", top: "46%" },
      { left: "82%", top: "60%" },
    ],
    []
  );

  const getPhoto = (i) => photos[i % photos.length];

  return (
    <div className="relative w-full h-[820px] sm:h-[920px]">
      <svg viewBox="0 0 800 520" className="absolute inset-0 h-full w-full">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="treeLight" cx="50%" cy="40%" r="45%">
            <stop offset="0%" stopColor="#5eead4" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#2dd4bf" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.05" />
          </radialGradient>
        </defs>

        <rect x="0" y="0" width="800" height="520" fill="url(#treeLight)" opacity="0.4">
          <animate attributeName="opacity" values="0.25;0.4;0.25" dur="7s" repeatCount="indefinite" />
        </rect>

        <path d="M400 520 C380 420, 380 320, 400 250 C420 200, 420 160, 420 120" stroke="#0f766e" strokeWidth="16" fill="none" filter="url(#glow)" />

        <path d="M400 320 C340 300, 300 280, 180 260" stroke="#0d9488" strokeWidth="10" fill="none" filter="url(#glow)" />
        <path d="M380 360 C300 360, 240 360, 160 320" stroke="#0d9488" strokeWidth="9" fill="none" filter="url(#glow)" />

        <path d="M400 320 C460 300, 520 280, 620 260" stroke="#0d9488" strokeWidth="10" fill="none" filter="url(#glow)" />
        <path d="M420 360 C500 360, 560 360, 640 320" stroke="#0d9488" strokeWidth="9" fill="none" filter="url(#glow)" />

        <path d="M410 200 C390 180, 370 160, 360 120" stroke="#14b8a6" strokeWidth="8" fill="none" filter="url(#glow)" />
        <path d="M430 180 C450 160, 470 140, 480 100" stroke="#14b8a6" strokeWidth="8" fill="none" filter="url(#glow)" />

        <path d="M390 300 C360 340, 330 360, 280 390" stroke="#14b8a6" strokeWidth="7" fill="none" filter="url(#glow)" />
        <path d="M410 300 C440 340, 470 360, 520 390" stroke="#14b8a6" strokeWidth="7" fill="none" filter="url(#glow)" />
        <path d="M400 260 C370 230, 340 210, 290 190" stroke="#14b8a6" strokeWidth="7" fill="none" filter="url(#glow)" />
        <path d="M420 240 C450 220, 480 200, 530 180" stroke="#14b8a6" strokeWidth="7" fill="none" filter="url(#glow)" />
        <path d="M380 280 C350 250, 320 230, 280 210" stroke="#14b8a6" strokeWidth="6" fill="none" filter="url(#glow)" />
        <path d="M420 260 C450 240, 480 220, 520 200" stroke="#14b8a6" strokeWidth="6" fill="none" filter="url(#glow)" />
      </svg>

      {points.map((pos, i) => {
        const p = getPhoto(i);
        return (
          <div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
            style={{ left: pos.left, top: pos.top }}
          >
            <div className="mx-auto h-6 w-px bg-slate-400"></div>
            <img
              src={p.thumb}
              alt={p.title}
              loading="lazy"
              decoding="async"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-md object-cover shadow-lg border-4 border-white cursor-pointer hover:scale-105 transition-transform"
              onClick={() => onSelect(p)}
              draggable="false"
            />
            <div className="mt-2 text-xs sm:text-sm font-medium text-slate-700">{p.title}</div>
          </div>
        );
      })}
    </div>
  );
}

function CursorHearts() {
  const [hearts, setHearts] = useState([]);
  
  useEffect(() => {
    let timeoutId;
    
    const handleMouseMove = (e) => {
      const heart = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      
      setHearts(prev => [...prev.slice(-5), heart]);
      
      // Remove heart after animation
      timeoutId = setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== heart.id));
      }, 2000);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);
  
  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-pink-400 text-xl animate-bounce"
          style={{
            left: heart.x - 10,
            top: heart.y - 10,
            animation: 'heartFloat 2s ease-out forwards',
          }}
        >
          💖
        </div>
      ))}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes heartFloat {
            0% {
              transform: translateY(0) scale(1);
              opacity: 1;
            }
            100% {
              transform: translateY(-100px) scale(1.5);
              opacity: 0;
            }
          }
        `
      }} />
    </div>
  );
}
 
