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

#### TOYS
Opens an inventory menu where the player may pick toys to play with their Daemon.

#### HEAL
If the Daemon is sick or injured, this button alleviates their ailments.

#### GAMES
Opens a mini-game selection menu. These mini-games are the primary method for earning currency.

#### STORE
Takes the player to a storefront where they may purchase food and toys for their Daemon with the currency earned from mini-games

#### BATH
Spawns implements necessary for bathing the Daemon.

#### SLEEP
Puts the Daemon to bed if they are sleepy, or wakes them up if they are sleeping.

#### SAVE
Allows the player to save their game, or load an existing save file.

## The Engine

### ECS

My Little Daemon's engine uses an Entity Component System. This means that rather than defining game objects with a complicated inheritance tree, every game object is derived from the same base class: Entity. The Entity class does not contain any state on its own. Instead, it contains a set of components which hold all the pertinent information about an entity. For example, an entity that is meant to be drawn to the screen may have a Sprite component that holds the image bitmap intended to represent that entity.

Neither the Entity class nor any of the Component classes contain any logic about how Entity instances should behave. Instead, that is handled by systems. Each system has its own set of Component classes, and it only acts on Entity instances which have those components.

The main benefit is that game object functionality is highly modular with this architecture. New Components and systems are often trivially easy to add without modifying existing code. Also, there are performance benefits since each system is only performing calculations relevant to the specific entities that they affect. 

### Space Paritioning

My Little Daemon uses spatial hashing to optimize collision detection. Essentially, each entity's hitbox is hashed to a set of cells on a grid based on its position and dimensions. Entities that share cells must have hitboxes that are relatively close together. If two entities do not share any cells at all, then it is guaranteed that they cannot be colliding.

### Finite State Machines

Some objects have relatively complex behavior that is difficult to comprehensively model using components and systems. This is usually because their intended behavior is highly contextual. To help define this behavior there is a subclass of systems: FiniteStateMachine. Accompanying this system is the Automaton component. The Automaton component simply holds an entity's current state and the amount of time it has been in that state. Systems deriving from FiniteStateMachine simply define how entities should behave in each state, along with any logic that needs to be executed before/after automation.
