//all needed functions for Beta



// PLAY LVL 1 - what happens when you press "play"
function activatePlayButton()
{
    //level 1 starts
    l1 = true;

    //creates a timer
    myLoop = game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
    totalTime = 30;
    begginingText.exists = false;
    playButton.exists = false;

    //killing first player and coin and resetting score
    coin.kill();
    player.kill();
    score = 0;
    text.setText("Score: " + score);

    //creating first coin and player
    createCoin();
    createPlayer();
    
}


// END LEVEL - decides when you lose and when you win
function endLevel()
{
    if (score == 60 && totalTime > 0 && l1)
    {
        winLevel1()
    }
    else if(totalTime == 0 && l1)
    {
        loseLevel1()
    }
    else if(score == 100 && totalTime > 0 && l2)
    {
        winLevel2()
    }
    else if(score < 100 && totalTime == 0 && l2)
    {
        loseLevel2()
    }
}


//WIN LVL 1 - what happens when you win lvl 1

function winLevel1()
{
    // displays end text
    endText.exists = true;
    endText.setText("Браво! Ти завърши първото ниво!")

    //stops time
    game.time.events.remove(myLoop);


    //removes other texts and kills player and coin
    begginingText.existas = false;
    timerText.exists = false;
    text.exists = false
    player.kill()
    coin.kill()

    //shows tryAgain button
    nextLevelButton.exists = true

    //lvl 1 ends
    l1 = false;
    
}



//LOSE LVL 1 - what happens when you lose lvl 1
function loseLevel1()
{
    // displays end text
    endText.exists = true;
    endText.setText("О, не! Не успя на време! Опитай отново!")

    //stops time
    game.time.events.remove(myLoop);


    //removes other texts and kills player and coin
    timerText.exists = false;
    text.exists = false
    player.kill()
    coin.kill()

    //shows try again button
    tryAgainButton.exists = true

    //lvl 1 ends
    l1 = false;
}


//Try again lvl 1
function activateTryAgainButton()
{
    //creates 30sec timer
    myLoop = game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
    totalTime = 30;
    score = 0;

    endText.exists = false;
    tryAgainButton.exists = false;

    timerText.exists = true;
    text.exists = true;
    text.setText("Score: " + score)

    createPlayer();
    createCoin();

    l1 = true;
}



//Click Next Level Button
function activateNextLevelButton()
{
    l1 = false;
    //lvl 2 starts
    l2 = true;

    //shows beginning text
    endText.exists = false;
    begginingText.setText("Ниво две. Събери 100 точки за 25 секунди!")
    begginingText.x = game.world.centerX - 240;
    begginingText.exists = true;  
    timerText.exists = false;
    text.exists = false;  

    
    playButton2.exists = true;

    nextLevelButton.exists = false;
}





//Start Lvl 2
function activatePlayButton2()
{
    //starts lvl 2 if it has stopped (bug fix)
    l2 = true;

    //starts the timer
    myLoop = game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
    totalTime = 25;
    score = 0;

    
    endText.exists = false;
    begginingText.exists = false;
    tryAgainButton.exists = false;
    playButton2.exists = false;
    timerText.exists = true;
    text.exists = true;
    text.setText("Score: " + score)

    
    createPlayer();
    createCoin();
}

//When you win lvl 2
function winLevel2()
{
    
    endText.exists = true;
    endText.setText("Браво! Ти успя да превъртиш играта! :D")

   
    game.time.events.remove(myLoop);
    score = 0;
    totalTime = 0;

    
    timerText.exists = false;
    text.exists = false
    player.kill()
    coin.kill()
    
    l2 = false;
}


//When you lose lvl 2
function loseLevel2()
{
    // shows text
    endText.exists = true;
    endText.setText("О, не! Не успя на време! Върни се на ниво 1!")

    //stops timer and sets score to 0
    game.time.events.remove(myLoop);
    score = 0;
    totalTime = 0;

    //removes text, player, coin
    timerText.exists = false;
    text.exists = false
    player.kill()
    coin.kill()

    //shows tryAgain button
    tryAgainButton.exists = true;
    

    //lvl 2 ends
    l2 = false;
}



//timer function
function updateCounter() {

    totalTime--;

    timerText.setText("Time left: " + totalTime);

}

//infinite map
function infiniteMap(player)
{
    if(player.x > 1340){
        player.x = 0;
    }
    if(player.x < 0)
    {
        player.x = 1340;
    }
}

//movement animations
function playerAnimations(player)
{
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        player.animations.play("Right");
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
        player.animations.play("Left");
    }
    else if(game.input.keyboard.isDown(Phaser.Keyboard.UP))
    {
        player.animations.play("Jump");
    }
    else{
        if(player.frame == 0 || player.frame == 1 ||player.frame == 2 ||player.frame == 3 ||player.frame == 4 ||player.frame == 5 ||player.frame == 6 ||player.frame == 7 || player.frame == 8 )
        {
            player.frame = 0;
        }
        else if(player.frame == 9 || player.frame == 10 ||player.frame == 11 ||player.frame == 12 ||player.frame == 13 ||player.frame == 14 ||player.frame == 15 ||player.frame == 16 || player.frame == 17 )
        {
            player.frame = 17;
        } 
    }
}

//creates coin
function createCoin() {
    
    coin = allCoins.create(game.world.randomX,game.world.randomY-150, 'coin');
    game.physics.enable(coin, Phaser.Physics.ARCADE);
    coin.scale.setTo(0.5);
    coin.body.velocity.setTo(0, 200);
    coin.body.collideWorldBounds = true;
    coin.body.bounce.set(0.6);
    coin.body.gravity.set(0, 2400);
    coin.animations.add('walkLeft', [6, 7, 8, 9, 10, 11], 10, true).play();
}

//creates player
function createPlayer()
{
    player = allPlayers.create(600, 0, 'guy');
        
    player.animations.add('Right', [0, 1, 2, 3, 4, 5, 6, 7, 8], 12, true);
    player.animations.add('Left', [9, 10, 11, 12, 13, 14, 15, 16, 17], 12, true);
    player.animations.add("Jump", [27]);
    
    player.scale.setTo(0.5);
}

//nulates player velocity
function playerStopVelocity(player)
{
    player.x.velocity = 0;
    player.y.velocity = 0;
}

//player movement
function playerXMovement(speed)
{
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        player.x -= speed;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        player.x += speed;
    }
}

//initiates platform
function initPlatform(platformObject, lenght, hieght)
{
    platformObject.body.immovable = true;
    platformObject.scale.setTo(lenght, hieght);
    platformObject.body.allowGravity = false ;
}