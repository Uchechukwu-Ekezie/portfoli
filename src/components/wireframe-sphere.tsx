'use client'

export default function WireframeSphere() {
  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-black overflow-hidden">
      <div 
        className="w-[600px] h-[600px]"
        style={{
          perspective: '2000px',
          perspectiveOrigin: 'center center'
        }}
      >
        <div 
          className="relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            animation: 'rotate3d 12s linear infinite'
          }}
        >
          <style jsx>{`
            @keyframes rotate3d {
              0% { transform: rotateX(0deg) rotateY(0deg); }
              25% { transform: rotateX(20deg) rotateY(90deg); }
              50% { transform: rotateX(0deg) rotateY(180deg); }
              75% { transform: rotateX(-20deg) rotateY(270deg); }
              100% { transform: rotateX(0deg) rotateY(360deg); }
            }
            
            .wireframe-ring {
              position: absolute;
              top: 50%;
              left: 50%;
              border: 2px solid #fbbf24;
              border-radius: 50%;
              transform-origin: center center;
              opacity: 0.8;
              box-shadow: 0 0 20px rgba(251, 191, 36, 0.3);
              transition: opacity 0.3s ease;
            }
            
            .wireframe-ring:hover {
              opacity: 1;
              box-shadow: 0 0 30px rgba(251, 191, 36, 0.6);
            }
            
            .glow {
              filter: drop-shadow(0 0 8px rgba(251, 191, 36, 0.6));
              border-width: 3px;
            }
            
            .pulse {
              animation: ringPulse 3s ease-in-out infinite;
            }
            
            @keyframes ringPulse {
              0%, 100% { opacity: 0.6; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.02); }
            }
          `}</style>
          
          {/* Main outer equator ring */}
          <div 
            className="wireframe-ring glow"
            style={{
              width: '500px',
              height: '500px',
              marginLeft: '-250px',
              marginTop: '-250px',
              transform: 'rotateX(0deg)'
            }}
          />
          
          {/* Horizontal latitude rings */}
          <div 
            className="wireframe-ring"
            style={{
              width: '450px',
              height: '450px',
              marginLeft: '-225px',
              marginTop: '-225px',
              transform: 'rotateX(20deg)'
            }}
          />
          <div 
            className="wireframe-ring"
            style={{
              width: '400px',
              height: '400px',
              marginLeft: '-200px',
              marginTop: '-200px',
              transform: 'rotateX(35deg)'
            }}
          />
          <div 
            className="wireframe-ring"
            style={{
              width: '320px',
              height: '320px',
              marginLeft: '-160px',
              marginTop: '-160px',
              transform: 'rotateX(50deg)'
            }}
          />
          <div 
            className="wireframe-ring"
            style={{
              width: '220px',
              height: '220px',
              marginLeft: '-110px',
              marginTop: '-110px',
              transform: 'rotateX(65deg)'
            }}
          />
          <div 
            className="wireframe-ring"
            style={{
              width: '100px',
              height: '100px',
              marginLeft: '-50px',
              marginTop: '-50px',
              transform: 'rotateX(80deg)'
            }}
          />
          
          {/* Southern hemisphere rings */}
          <div 
            className="wireframe-ring"
            style={{
              width: '450px',
              height: '450px',
              marginLeft: '-225px',
              marginTop: '-225px',
              transform: 'rotateX(-20deg)'
            }}
          />
          <div 
            className="wireframe-ring"
            style={{
              width: '400px',
              height: '400px',
              marginLeft: '-200px',
              marginTop: '-200px',
              transform: 'rotateX(-35deg)'
            }}
          />
          <div 
            className="wireframe-ring"
            style={{
              width: '320px',
              height: '320px',
              marginLeft: '-160px',
              marginTop: '-160px',
              transform: 'rotateX(-50deg)'
            }}
          />
          <div 
            className="wireframe-ring"
            style={{
              width: '220px',
              height: '220px',
              marginLeft: '-110px',
              marginTop: '-110px',
              transform: 'rotateX(-65deg)'
            }}
          />
          <div 
            className="wireframe-ring"
            style={{
              width: '100px',
              height: '100px',
              marginLeft: '-50px',
              marginTop: '-50px',
              transform: 'rotateX(-80deg)'
            }}
          />
          
          {/* Vertical longitude rings */}
          <div 
            className="wireframe-ring glow"
            style={{
              width: '500px',
              height: '500px',
              marginLeft: '-250px',
              marginTop: '-250px',
              transform: 'rotateY(90deg)'
            }}
          />
          <div 
            className="wireframe-ring"
            style={{
              width: '500px',
              height: '500px',
              marginLeft: '-250px',
              marginTop: '-250px',
              transform: 'rotateY(30deg)'
            }}
          />
          <div 
            className="wireframe-ring"
            style={{
              width: '500px',
              height: '500px',
              marginLeft: '-250px',
              marginTop: '-250px',
              transform: 'rotateY(60deg)'
            }}
          />
          <div 
            className="wireframe-ring"
            style={{
              width: '500px',
              height: '500px',
              marginLeft: '-250px',
              marginTop: '-250px',
              transform: 'rotateY(120deg)'
            }}
          />
          <div 
            className="wireframe-ring"
            style={{
              width: '500px',
              height: '500px',
              marginLeft: '-250px',
              marginTop: '-250px',
              transform: 'rotateY(150deg)'
            }}
          />
          
          {/* Diagonal rings for more complexity */}
          <div 
            className="wireframe-ring pulse"
            style={{
              width: '450px',
              height: '450px',
              marginLeft: '-225px',
              marginTop: '-225px',
              transform: 'rotateX(45deg) rotateY(45deg)'
            }}
          />
          <div 
            className="wireframe-ring pulse"
            style={{
              width: '450px',
              height: '450px',
              marginLeft: '-225px',
              marginTop: '-225px',
              transform: 'rotateX(-45deg) rotateY(45deg)'
            }}
          />
          <div 
            className="wireframe-ring"
            style={{
              width: '400px',
              height: '400px',
              marginLeft: '-200px',
              marginTop: '-200px',
              transform: 'rotateX(30deg) rotateY(75deg)'
            }}
          />
          <div 
            className="wireframe-ring"
            style={{
              width: '400px',
              height: '400px',
              marginLeft: '-200px',
              marginTop: '-200px',
              transform: 'rotateX(-30deg) rotateY(75deg)'
            }}
          />
          <div 
            className="wireframe-ring"
            style={{
              width: '350px',
              height: '350px',
              marginLeft: '-175px',
              marginTop: '-175px',
              transform: 'rotateX(60deg) rotateY(30deg)'
            }}
          />
          <div 
            className="wireframe-ring"
            style={{
              width: '350px',
              height: '350px',
              marginLeft: '-175px',
              marginTop: '-175px',
              transform: 'rotateX(-60deg) rotateY(30deg)'
            }}
          />
          
          {/* Inner core rings */}
          <div 
            className="wireframe-ring"
            style={{
              width: '200px',
              height: '200px',
              marginLeft: '-100px',
              marginTop: '-100px',
              transform: 'rotateX(45deg) rotateZ(45deg)'
            }}
          />
          <div 
            className="wireframe-ring"
            style={{
              width: '150px',
              height: '150px',
              marginLeft: '-75px',
              marginTop: '-75px',
              transform: 'rotateY(45deg) rotateZ(30deg)'
            }}
          />
          
          {/* Pulsing center core */}
          <div 
            className="absolute top-1/2 left-1/2 w-8 h-8 bg-amber-400 rounded-full"
            style={{
              marginLeft: '-16px',
              marginTop: '-16px',
              boxShadow: '0 0 50px rgba(251, 191, 36, 0.8), 0 0 100px rgba(251, 191, 36, 0.4), 0 0 150px rgba(251, 191, 36, 0.2)',
              animation: 'corePulse 2s ease-in-out infinite'
            }}
          />
          
          <style jsx>{`
            @keyframes corePulse {
              0%, 100% { 
                transform: scale(1);
                box-shadow: 0 0 50px rgba(251, 191, 36, 0.8), 0 0 100px rgba(251, 191, 36, 0.4), 0 0 150px rgba(251, 191, 36, 0.2);
              }
              50% { 
                transform: scale(1.2);
                box-shadow: 0 0 70px rgba(251, 191, 36, 1), 0 0 140px rgba(251, 191, 36, 0.6), 0 0 200px rgba(251, 191, 36, 0.3);
              }
            }
          `}</style>
        </div>
      </div>
    </div>
  )
}