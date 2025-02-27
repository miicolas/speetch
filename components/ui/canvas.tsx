// Types pour nos objets
interface NOptions {
  phase?: number;
  offset?: number;
  frequency?: number;
  amplitude?: number;
}

interface LineOptions {
  spring: number;
}

interface CanvasSettings {
  debug: boolean;
  friction: number;
  trails: number;
  size: number;
  dampening: number;
  tension: number;
}

interface NodeType {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Position {
  x: number;
  y: number;
}

interface CanvasContext extends CanvasRenderingContext2D {
  running?: boolean;
  frame?: number;
}

// Global variables
let ctx: CanvasContext;
let f: nType;
let e = 0;
let pos: Position = { x: 0, y: 0 };
let lines: LineType[] = [];
const E: CanvasSettings = {
  debug: true,
  friction: 0.5,
  trails: 80,
  size: 50,
  dampening: 0.025,
  tension: 0.99,
};

// Classe Oscillateur
class nType {
  phase: number;
  offset: number;
  frequency: number;
  amplitude: number;

  constructor(options: NOptions = {}) {
    this.phase = options.phase || 0;
    this.offset = options.offset || 0;
    this.frequency = options.frequency || 0.001;
    this.amplitude = options.amplitude || 1;
  }

  update(): number {
    this.phase += this.frequency;
    e = this.offset + Math.sin(this.phase) * this.amplitude;
    return e;
  }

  value(): number {
    return e;
  }
}

// Classe Node
class Node implements NodeType {
  x: number = 0;
  y: number = 0;
  vx: number = 0;
  vy: number = 0;
}

// Classe Line
class LineType {
  spring: number;
  friction: number;
  nodes: NodeType[];

  constructor(options: LineOptions) {
    this.spring = options.spring + 0.1 * Math.random() - 0.05;
    this.friction = E.friction + 0.01 * Math.random() - 0.005;
    this.nodes = [];
    
    for (let i = 0; i < E.size; i++) {
      const node = new Node();
      node.x = pos.x;
      node.y = pos.y;
      this.nodes.push(node);
    }
  }

  update(): void {
    let springForce = this.spring;
    let node = this.nodes[0];
    
    node.vx += (pos.x - node.x) * springForce;
    node.vy += (pos.y - node.y) * springForce;
    
    for (let i = 0, len = this.nodes.length; i < len; i++) {
      node = this.nodes[i];
      
      if (i > 0) {
        const prevNode = this.nodes[i - 1];
        node.vx += (prevNode.x - node.x) * springForce;
        node.vy += (prevNode.y - node.y) * springForce;
        node.vx += prevNode.vx * E.dampening;
        node.vy += prevNode.vy * E.dampening;
      }
      
      node.vx *= this.friction;
      node.vy *= this.friction;
      node.x += node.vx;
      node.y += node.vy;
      springForce *= E.tension;
    }
  }

  draw(): void {
    let currentNode, nextNode;
    let x = this.nodes[0].x;
    let y = this.nodes[0].y;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    
    for (let i = 1, len = this.nodes.length - 2; i < len; i++) {
      currentNode = this.nodes[i];
      nextNode = this.nodes[i + 1];
      x = 0.5 * (currentNode.x + nextNode.x);
      y = 0.5 * (currentNode.y + nextNode.y);
      ctx.quadraticCurveTo(currentNode.x, currentNode.y, x, y);
    }
    
    currentNode = this.nodes[this.nodes.length - 2];
    nextNode = this.nodes[this.nodes.length - 1];
    ctx.quadraticCurveTo(currentNode.x, currentNode.y, nextNode.x, nextNode.y);
    ctx.stroke();
    ctx.closePath();
  }
}

// Gestionnaire d'événements de la souris
function onMousemove(e: MouseEvent | TouchEvent): void {
  function initLines(): void {
    lines = [];
    for (let i = 0; i < E.trails; i++) {
      lines.push(new LineType({ spring: 0.45 + (i / E.trails) * 0.025 }));
    }
  }

  function handlePointerMove(e: MouseEvent | TouchEvent): void {
    if ('touches' in e) {
      pos.x = e.touches[0].pageX;
      pos.y = e.touches[0].pageY;
    } else {
      pos.x = e.clientX;
      pos.y = e.clientY;
    }
    e.preventDefault();
  }

  function handleTouchStart(e: TouchEvent): void {
    if (e.touches.length === 1) {
      pos.x = e.touches[0].pageX;
      pos.y = e.touches[0].pageY;
    }
  }

  document.removeEventListener('mousemove', onMousemove);
  document.removeEventListener('touchstart', onMousemove);
  document.addEventListener('mousemove', handlePointerMove as EventListener);
  document.addEventListener('touchmove', handlePointerMove as EventListener);
  document.addEventListener('touchstart', handleTouchStart);
  
  handlePointerMove(e);
  initLines();
  render();
}

// Rendu de l'animation
function render(): void {
  if (ctx.running) {
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.globalCompositeOperation = 'lighter';
    ctx.strokeStyle = `hsla(${Math.round(f.update())},100%,50%,0.025)`;
    ctx.lineWidth = 10;
    
    for (let i = 0; i < E.trails; i++) {
      const line = lines[i];
      line.update();
      line.draw();
    }
    
    ctx.frame!++;
    window.requestAnimationFrame(render);
  }
}

// Redimensionnement du canvas
function resizeCanvas(): void {
  ctx.canvas.width = window.innerWidth - 20;
  ctx.canvas.height = window.innerHeight;
}

// Fonction d'export pour initialiser le canvas
export const renderCanvas = function(): void {
  const canvasElement = document.getElementById('canvas') as HTMLCanvasElement;
  if (!canvasElement) return;
  
  ctx = canvasElement.getContext('2d') as CanvasContext;
  if (!ctx) return;
  
  ctx.running = true;
  ctx.frame = 1;
  
  f = new nType({
    phase: Math.random() * 2 * Math.PI,
    amplitude: 85,
    frequency: 0.0015,
    offset: 285,
  });
  
  document.addEventListener('mousemove', onMousemove as EventListener);
  document.addEventListener('touchstart', onMousemove as EventListener);
  document.body.addEventListener('orientationchange', resizeCanvas);
  window.addEventListener('resize', resizeCanvas);
  
  window.addEventListener('focus', () => {
    if (!ctx.running) {
      ctx.running = true;
      render();
    }
  });
  
  window.addEventListener('blur', () => {
    ctx.running = true;
  });
  
  resizeCanvas();
};
