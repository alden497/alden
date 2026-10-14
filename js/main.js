const D={
 30:{n:'Melati 30/60',w:6,h:5,r:[[0,0,6,1,'Teras'],[0,1,6,1.8,'Ruang tamu'],[0,2.8,2.5,2.2,'Kamar 1'],[2.5,2.8,2,2.2,'Kamar 2'],[4.5,2.8,1.5,1.1,'KM'],[4.5,3.9,1.5,1.1,'Dapur']],c:'Dapur kecil di belakang, ruang tamu bisa jadi ruang keluarga. Atap rangka baja ringan.'},
 36:{n:'Mawar 36/72',w:6,h:6,r:[[0,0,6,1.2,'Teras'],[0,1.2,2.8,2.6,'Kamar 1'],[2.8,1.2,3.2,2.6,'Ruang tamu'],[0,3.8,3,2.2,'Kamar 2'],[3,3.8,1.4,2.2,'KM'],[4.4,3.8,1.6,2.2,'Dapur']],c:'Tanah 72 m² menyisakan carport dan halaman kecil di depan, plus ruang jemur di belakang.'},
 45:{n:'Kenanga 45/84',w:7.5,h:6,r:[[0,0,7.5,1.3,'Teras'],[0,1.3,3.5,2.5,'Ruang tamu'],[3.5,1.3,4,2.5,'Kamar utama'],[0,3.8,2.4,2.2,'Kamar 2'],[2.4,3.8,2.4,2.2,'Kamar 3'],[4.8,3.8,1.2,2.2,'KM'],[6,3.8,1.5,2.2,'Dapur']],c:'Pondasi sudah disiapkan kuat untuk dibangun lantai 2 kelak, tanpa bongkar ulang.'}
};
const s=44,pd=36,col=n=>/Kamar/.test(n)?'#f6d9a8':/KM/.test(n)?'#cfe3e0':/Teras/.test(n)?'#dfe7c9':'#fbf8ec';
function show(t){
 const d=D[t],W=d.w*s+pd*2,H=d.h*s+pd*2+18,p=document.getElementById('plan');
 p.setAttribute('viewBox',`0 0 ${W} ${H}`);
 let g=`<g font-family="Karla,Arial,sans-serif" text-anchor="middle" fill="#17284a">`;
 d.r.forEach(([x,y,w,h,n])=>{const cx=pd+(x+w/2)*s,cy=pd+(y+h/2)*s;
  g+=`<rect x="${pd+x*s}" y="${pd+y*s}" width="${w*s}" height="${h*s}" fill="${col(n)}" stroke="#17284a" stroke-width="3"/><text x="${cx}" y="${cy-1}" font-size="12" font-weight="700">${n}</text><text x="${cx}" y="${cy+13}" font-size="10" opacity=".7">${(w*h).toFixed(1)} m²</text>`});
 g+=`<text x="${W/2}" y="${pd-12}" font-size="12">${d.w} m</text><text x="${W/2}" y="${H-6}" font-size="11" opacity=".7">Skema denah, bukan skala gambar kerja</text></g>`;
 p.innerHTML=g;
 document.getElementById('jd').textContent='Tipe '+d.n;
 document.getElementById('dl').innerHTML=`<dt>Bangunan</dt><dd>${d.n.split(' ')[1].split('/')[0]} m²</dd><dt>Tanah</dt><dd>${d.n.split('/')[1]} m²</dd><dt>Kamar tidur</dt><dd>${d.r.filter(r=>/Kamar/.test(r[4])).length}</dd><dt>Fondasi</dt><dd>Batu kali, sloof beton</dd>`;
 document.getElementById('cat').textContent=d.c;
 document.querySelectorAll('.tabs button').forEach(b=>b.setAttribute('aria-selected',b.dataset.t==t));
}
document.querySelectorAll('[data-t]').forEach(e=>e.addEventListener('click',()=>show(e.dataset.t)));
show(30);
// menu
const bg=document.getElementById('burger'),mn=document.getElementById('menu');
bg.onclick=()=>{const o=mn.classList.toggle('buka');bg.setAttribute('aria-expanded',o)};
mn.onclick=e=>{if(e.target.tagName=='A'){mn.classList.remove('buka');bg.setAttribute('aria-expanded',false)}};
// kpr
const rp=n=>'Rp'+Math.round(n).toLocaleString('id-ID');
function hitung(){
 const h=+tp.value*1e6,d=+dp.value,pk=h*(1-d/100),r=.075/12,n=+tn.value*12;
 dpv.textContent=d;o1.textContent=rp(h*d/100);
 o2.textContent=rp(pk*r/(1-Math.pow(1+r,-n)));
}
['tp','dp','tn'].forEach(i=>document.getElementById(i).addEventListener('input',hitung));hitung();
// kontak
fm.onsubmit=e=>{e.preventDefault();
 const t=`Halo Griya Kembang, saya ${nm.value}. Saya tertarik dengan tipe ${ty.value}. ${ps.value}`;
 window.open('https://wa.me/6281234567890?text='+encodeURIComponent(t),'_blank');
};
