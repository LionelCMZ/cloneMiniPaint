import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lienzo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './lienzo.component.html',
  styleUrl: './lienzo.component.css',
})
export class LienzoComponent {
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('size-slider') slider: any;
  ctx: any;
  canvasWidth: number = 700;
  canvasHeight: number = 600;
  isDrawing: boolean = false;
  trazos: { color: string; grosor: number; trazo: Path2D }[] = [];
  context: CanvasRenderingContext2D | null = null;
  penColor = '#000000';
  penThickness: number = 1;
  selectedTool: string = 'pen';
  selectedColor: string = '#000000';
  imgSrc =
    'https://th.bing.com/th/id/R.5e577e4ae83cd7583bbcf3a9424f6e05?rik=DhXdk1gioO%2blOA&pid=ImgRaw&r=0';
  backgroundImage: HTMLImageElement = new Image();
  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.backgroundImage.src = this.imgSrc;
  }
  clearCanvas() {
    if (this.context) {
      this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.trazos = [];
    }
  }
  cambiarGrosor(nuevoGrosor: number) {
    this.penThickness = nuevoGrosor;
    this.ctx.lineWidth = this.penThickness;
    console.log(nuevoGrosor);
  }
  seleccionarGrosor(event: Event) {
    const grosor = (event.target as HTMLInputElement).value;
    this.cambiarGrosor(Number(grosor));
  }
  startDrawing(event: MouseEvent, color: string, grosor: number): void {
    this.isDrawing = true;
    const nuevoTrazo = new Path2D();
    nuevoTrazo.moveTo(event.offsetX, event.offsetY);
    this.trazos.push({
      trazo: nuevoTrazo,
      color: color,
      grosor: grosor,
    });
  }
  draw(event: MouseEvent): void {
    if (this.isDrawing) {
      const trazoActual = this.trazos[this.trazos.length - 1];
      trazoActual.trazo.lineTo(event.offsetX, event.offsetY);
      this.ctx.strokeStyle = trazoActual.color;
      this.ctx.lineWidth = trazoActual.grosor;
      this.ctx.stroke(trazoActual.trazo);
    }
    console.log(this.trazos);
    
  }
  endDrawing(): void {
    this.isDrawing = false;
  }
  regresarUltimoTrazo(): void {
    if (this.trazos.length > 0) {
      this.trazos.pop();
      const canvas = this.canvas.nativeElement;
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const trazo of this.trazos) {
        console.log(trazo.grosor);
        
        //this.ctx.beginPath();
        this.ctx.strokeStyle = trazo.color;
        this.ctx.lineWidth = trazo.grosor;
        this.ctx.stroke(trazo.trazo);
      }
    }
    console.log(this.trazos);
    
  }
}
