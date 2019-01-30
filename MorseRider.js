/*
TODO:
Cheats
Final State
Dude Spritesheet bereinigen
*/

//  var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'game');
      var game = new Phaser.Game(640, 360, Phaser.CANVAS, '',null, false, false);
      
     if(localStorage.getItem('progress') === null){
        localStorage.setItem('progress',0);
    }   

var alphabet = {'A':".-",'B':"-...",'C':"-.-.",'D':"-..",'E':".",'F':"..-.",'G':"--.",'H':"....",'I':"..",'J':".---",'K':"-.-",'L':".-..",'M':"--",'N':"-.",'O':"---",'P':".--.",'Q':"--.-",'R':".-.",'S':"...",'T':"-",'U':"..-",'V':"...-",'W':".--",'X':"-..-",'Y':"-.--",'Z':"--..",'1':".----",'2':"..---",'3':"...--",'4':"....-",'5':".....",'6':"-....",'7':"--...",'8':"---..",'9':"----.",'0':"-----",'.':".-.-.-",',':"--..--",':':"---...",'?':"..--..",'\'':".----.",'-':"-....-",'/':"-..-.",'(':"-.--.-",')':"-.--.-",'"':".-..-.",'@':".--.-.",'=':"-...-",' ':"/"};
var level;
var levels = [];
/*00*/levels.push(['              ','easy']); 
/*01*/levels.push(['  E  ','easy']); 
/*02*/levels.push([' E I S H ','easy']); 
/*03*/levels.push([' I  T ','easy']); 
/*04*/levels.push(['S O S','easy']); 
/*05*/levels.push(['ET A Y NM','easy']); 
/*06*/levels.push(['S U R E','easy']);         
/*07*/levels.push(['EASY','easy']);       
/*08*/levels.push(['TWO WORDS','easy']); 
/*09*/levels.push(['LOW ENEMY','easy']); 
/*10*/levels.push(['MORSERUNNER','easy']); 
/*11*/levels.push(['OGKDWRUS','easy']);
/*12*/levels.push(['QZYCXB   JPLFVH','easy']); 
/*13*/levels.push(['12345  -.  67890','easy']); 
/*14*/levels.push(['KMURE   SNAPT   LWZFO   YVGJQ   HBICD -XLW.','easy']);
/*15*/levels.push(['HARDER?','normal']); 
/*16*/levels.push(['IF YOU WANT SO','normal']); 
/*17*/levels.push(['WOW WHOLE SENTENCES','normal']); 
/*18*/levels.push(['MORSING IS FUN','normal']); 
/*19*/levels.push(['TRY THE LEVELEDITOR','normal']); 
/*20*/levels.push(['FIRST MORSE-MESSAGE 1844','normal']); 
/*21*/levels.push(['WASHINGTON TO BALTIMORE','normal']); 
/*22*/levels.push(['WHAT HATH GOD WROUGHT','normal']); 
/*23*/levels.push(['SOS MEANS NOTHING','normal']); 
/*24*/levels.push(['SOS IS JUST GOOD TO MORSE','normal']); 
/*25*/levels.push(['SOME PEOPLE STILL MORSE AS HOBBY','normal']); 
/*26*/levels.push(['THIS IS JUST A GAME','normal']); 
/*27*/levels.push(['LETS TRY A PANGRAM','normal']); 
/*28*/levels.push(['PACK MY BOX WITH FIVE DOZEN LIQUOR JUGS','normal']); 
/*29*/levels.push(['THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG','normal']); 
/*30*/levels.push(['KMURE   SNAPT   LWZFO   YVGJQ   HBICD -XLW.','normal']);   
/*31*/levels.push(['    ','hard']);   
/*32*/levels.push(['  E  ','hard']);   
/*33*/levels.push(['S O S','hard']);
/*34*/levels.push(['H A R D','hard']);
/*35*/levels.push(['G O O D L U C K','hard']);
/*36*/levels.push(['SUPERHARD','hard']);   
/*37*/levels.push(['LEARN LETTERS','hard']);   
/*38*/levels.push(['KEEP PRACTICING','hard']);   
/*39*/levels.push(['YEAH - GOOD WORK','hard']);   
/*40*/levels.push(['10 9 8 7 6 5 4 3 2 1','hard']);   
/*41*/levels.push(['LOOKS LIKE YOU CAN MORSE','hard']);   
/*42*/levels.push(['CWM FJORD BANK GLYPHS VEXT QUIZ','hard']);   
/*43*/levels.push(['WOW NOONE EVER GOT HERE','hard']);   
/*44*/levels.push(['SHEP SCHWAB SHOPPED AT SCOTTS SCHNAPPS SHOP - ONE SHOT OF SCOTTS SCHNAPPS STOPPED SCHWABS WATCH.','hard']);   

game.state.add('Boot', BootState);
game.state.add('Preload', PreloadState);
game.state.add('Menu', MenuState);
game.state.add('Leveleditor', LevelEditorState);
game.state.add('SelectLevel', SelectLevelState);
game.state.add('Game', GameState);
game.state.add('Final', FinalState);
game.state.add('Win', WinState);
game.state.add('Over', OverState);
game.state.start('Boot');