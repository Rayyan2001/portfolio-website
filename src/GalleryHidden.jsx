import { useEffect, useMemo, useState } from "react";

// Import images from src/assets
import night from "./assets/night.jpeg";
import happy from "./assets/happy.jpeg";
import look from "./assets/look.jpeg";
import she from "./assets/she.jpeg";
import cutie from "./assets/cutie.jpeg";
import boii from "./assets/boii.jpeg";
import yeh from "./assets/Yeh.jpeg";
import us from "./assets/Us.jpeg";

// Lightbox Component
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

  const handleImageLoad = () => setImageLoaded(true);

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

          {!imageLoaded && (
            <div className="flex items-center justify-center h-64 bg-slate-100 dark:bg-slate-800">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto mb-4"></div>
                <p className="text-slate-600 dark:text-slate-400">
                  Loading image...
                </p>
              </div>
            </div>
          )}

          <img
            src={photo.src}
            alt={photo.title}
            className={`w-full h-auto max-h-[60vh] object-contain transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="eager"
            decoding="async"
            onLoad={handleImageLoad}
            style={{ display: imageLoaded ? "block" : "none" }}
          />

          <div className="p-4">
            <div className="font-semibold">{photo.title}</div>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              {photo.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Gallery Component
export default function GalleryHidden({ onBack }) {
  const [selected, setSelected] = useState(null);

  // Imported photos array
  const photos = useMemo(
    () => [
      {
        src: night,
        thumb: night,
        title: "Night Vibes",
        description: "Beautiful night moments captured in time.",
      },
      {
        src: happy,
        thumb: happy,
        title: "Happy Times",
        description: "Joyful memories that bring smiles to faces.",
      },
      {
        src: look,
        thumb: look,
        title: "Perfect Look",
        description: "Capturing the essence of beauty and grace.",
      },
      {
        src: she,
        thumb: she,
        title: "She",
        description: "A moment of elegance and charm.",
      },
      {
        src: cutie,
        thumb: cutie,
        title: "Cutie",
        description: "Adorable moments that warm the heart.",
      },
      {
        src: boii,
        thumb: boii,
        title: "Boii",
        description: "Cool vibes and confident energy.",
      },
      {
        src: yeh,
        thumb: yeh,
        title: "Yeh",
        description: "Special moments worth remembering.",
      },
      {
        src: us,
        thumb: us,
        title: "Us",
        description: "Together we create beautiful memories.",
      },
    ],
    []
  );

  // Create tree structure automatically
  const tree = useMemo(() => {
    const groupA = photos.slice(0, 2); // Memories
    const groupB = photos.slice(2, 4); // Joy
    const groupC = photos.slice(4, 6); // Elegance
    const groupD = photos.slice(6, 8); // Special

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
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Photo Album
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            A hidden collection with captions for each image.
          </p>
          <div className="mt-8">
            <Tree node={tree} onSelectPhoto={(p) => setSelected(p)} />
          </div>
        </div>
      </main>

      {selected && (
        <Lightbox photo={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

// Tree component
function Tree({ node, onSelectPhoto }) {
  return (
    <ul className="space-y-4">
      <TreeNode node={node} onSelectPhoto={onSelectPhoto} />
    </ul>
  );
}

// TreeNode component
function TreeNode({ node, onSelectPhoto }) {
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
              <span
                className={`transition-transform ${
                  open ? "rotate-90" : "rotate-0"
                }`}
              >
                ▶
              </span>
            </button>
          ) : (
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-transparent">
              •
            </span>
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
            {isLeaf
              ? node.description
              : `${node.children.length} items · ${node.description}`}
          </div>
        </div>
      </div>
      {node.children && open && (
        <ul className="mt-3 ml-6 border-l border-slate-300/60 pl-4 space-y-3">
          {node.children.map((child) => (
            <TreeNode
              key={child.src + child.title}
              node={child}
              onSelectPhoto={onSelectPhoto}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

// CursorHearts component
function CursorHearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    let timeoutId;

    const handleMouseMove = (e) => {
      const heart = { id: Date.now(), x: e.clientX, y: e.clientY };
      setHearts((prev) => [...prev.slice(-5), heart]);

      timeoutId = setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== heart.id));
      }, 2000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
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
            animation: "heartFloat 2s ease-out forwards",
          }}
        >
          💖
        </div>
      ))}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes heartFloat {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-100px) scale(1.5); opacity: 0; }
        }
      `,
        }}
      />
    </div>
  );
}
