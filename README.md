# My Little Daemon

My Little Daemon is a virtual pet webgame. The engine is built from scratch and it implements an Entity Component System (ECS). Within the game are multiple minigames

## Gameplay

The core of the game is the care of a pet Daemon. This Daemon must be fed, bathed, cleaned up after, shown affection, played with, and given adequate sleep. In order to accrue currency to purchase food, toys, and other amenities, the player must score points in mini-games.

### Care
Over time, the Daemon's hunger will increase and its happiness will decrease. They will get tired, they will defecate, they will occasionally fall ill or hurt themselves. The appropriate response to any of these is intuitive to real pet care. 

- If they are hungry, feed them. 
- If they are unhappy, show them affection by petting them or playing with them. 
- If they are sleepy, put them to bed.
- If they have an accident, click the mess to clean it up.
- If they are sick or injured, give them medicine.

### Buttons

On either side of the main canvas are bars of buttons with varying functionality.

#### HOME
Brings the player back to the home screen where the Daemon resides. This is where the player may feed
their Daemon and play with toys.

#### STATS
Shows a status menu including information such as the Daemon's name, age, and gender, along with bars representing how hungry/happy the Daemon is.

#### FOOD
Opens an inventory menu where the player may pick food items to feed their Daemon.

#### TOYS (Planned)
Opens an inventory menu where the player may pick toys to play with their Daemon.

#### HEAL (Planned)
If the Daemon is sick or injured, this button alleviates their ailments.

#### GAMES
Opens a mini-game selection menu. These mini-games are the primary method for earning currency.

#### STORE (Planned)
Takes the player to a storefront where they may purchase food and toys for their Daemon with the currency earned from mini-games

#### BATH (Planned)
Spawns implements necessary for bathing the Daemon.

#### SLEEP (Planned)
Puts the Daemon to bed if they are sleepy, or wakes them up if they are sleeping.

#### SAVE (Planned)
Allows the player to save their game.

## Mini-Games

### Match-3

The player is presented with an 8x8 grid of gems. Gems can be swapped with other gems that are orthogonally adjacent. If 3 or more gems of the same color are in a row, they match and are eliminated from the grid and the player is awarded points. To the left of the grid is a progress bar that fills up as points are earned. Each level, the player can make 10 moves. If the progress bar is filled when the player runs out of moves, their move counter is reset to 10 and they may continue play. If the bar is not filled up, however, the player loses. Each level requires more points to proceed.

There are some special gems that can be created when the player makes certain matches. 

#### Line Clear Gems

Horizontal and vertical line clear gems are created by matching 4 in a row. When matched, these gems eliminate all gems across a line on the board.

#### Bomb Gems

Bomb gems are created with two intersecting matches of 3 in a row (A match of 5, but not 5 in a row). When matched, these gems eliminate all adjacent gems around them.

#### Color Bomb Gems

Color Bomb gems are created by matching 5 in a row. These gems do not match normally. Instead, if they are swapped with another gem, they eliminate all gems of that color. For example, swapping a color bomb gem with a blue gem will eliminate all blue gems from the board. If two color bomb gems are swapped, then all gems on the board will be eliminated

## Things I've Learned

This game was created for a milestone project. I have been interested in game design and development for a very long time, and I always wanted to write my own game engine. In order to create even a weak, tiny game engine, I had to quickly learn about a wide range of topics. I'm very glad I pursued this. It was intensive, and it consumed my thoughts for weeks, but I greatly appreciate everything I learned in the process.

### Entity Component Systems

My Little Daemon's engine uses an Entity Component System. This means that rather than defining game objects with a complicated inheritance tree, every game object is derived from the same base class: Entity. The Entity class does not contain any state on its own. Instead, it contains a set of components which hold all the pertinent information about an entity. For example, an entity that is meant to be drawn to the screen may have a Sprite component that holds the image bitmap intended to represent that entity.

Neither the Entity class nor any of the Component classes contain any logic about how Entity instances should behave. Instead, that is handled by systems. Each system has its own set of Component classes, and it only acts on Entity instances which have those components.

The main benefit is that game object functionality is highly modular with this architecture. New Components and systems are often trivially easy to add without modifying existing code. Also, there are performance benefits since each system is only performing calculations relevant to the specific entities that they affect. 

### Space Paritioning

My Little Daemon uses spatial hashing to optimize collision detection. Essentially, each entity's hitbox is hashed to a set of cells on a grid based on its position and dimensions. Entities that share cells must have hitboxes that are relatively close together. If two entities do not share any cells at all, then it is guaranteed that they cannot be colliding.

### Finite State Machines

Some objects have relatively complex behavior that is difficult to comprehensively model using components and systems. This is usually because their intended behavior is highly contextual. To help define this behavior there is a subclass of systems: FiniteStateMachine. Accompanying this system is the Automaton component. The Automaton component simply holds an entity's current state and the amount of time it has been in that state. Systems deriving from FiniteStateMachine simply define how entities should behave in each state, along with any logic that needs to be executed before/after automation.

### Event-Driven Architecture

I plan on implementing an event messaging system for the game. For this game, the issue that I kept running into was that systems would often need to access the state of other systems just to look at a few variables. This caused systems to become coupled, which is particularly annoying because one of the main goals of implementing the ECS was to decouple game systems. Also, viewing the current state of entities and systems within the ECS from outside is difficult. Sometimes changes outside of the ECS need to be made in response to what takes place within it. Without any concept of events, this is achieved by having game states keep track of individual entities and system properties. This causes further coupling and results in convoluted game state definitions.

The basic structure for event-driven architecure consists of events, emitters, listeners, and a broker. Events are objects containing relevant information about changes in state. Emitters produce events to communicate changes in state. Listeners receive events and respond to them. Emitters and listeners are not mutually exclusive; a good example of this would be listeners whose job is to analyze a set of events and infer more complex events from them. Finally, the event broker acts as a middleman, taking any events produced by emitters and passing them along to any listeners who are subscribed to that kind of event. 

### Sequential Impulse Solver

I also plan on implementing a sequential impulse solver to handle collision resolution. The naive solution to collision resolution is to move any overlapping entities so they are no longer overlapping. This is problematic when entities are moved out of one collision and into another. To avoid multi-entity collisions resulting in a jittery mess, I had to rely on less-than-ideal workarounds. 

A sequential impulse solver fixes this by pushing entities outiside of each others' hitboxes with impulse vectors instead of just changing their positions. The part of this that makes it "sequential" is the way multi-entity collisions are handled. At each collision, the sequential impulse solver calculates a lambda value which represents how much the entities' hitboxes are will be overlapping after the impulse is applied. Whenever there are multiple entities involved in a collision, every individual point of contact is iterated over until the lambda values are all positive, indicating no more overlap.
