# game-of-life

Celem tego ćwiczenia jest napisanie prostej aplikacji w JavaScripcie, która pokazywać będzie interaktywną animację opartą o jeden z pierwszych i najbardziej znanych przykładów automatu komórkowego, wymyślony w roku 1970 przez brytyjskiego matematyka Johna Conwaya. Będziemy pisać w czystym JavaScripcie, opierając się na założeniach programowania obiektowego(?).

O Game Of Life możesz poczytać tutaj: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
obejrzyj też kilkuminutowy film tutaj: https://www.youtube.com/watch?v=C2vgICfQawE

**Przypomnijmy podstawowe założenia:**
1. Game of Life to tak zwana zero-player game, która rozwija się na podstawie swojego podstawowego stanu.
2. Komórki powstają i umierają na dwuwymiarowej planszy, a ich stan uzależniony jest od ich otoczenia (ośmiu komórek będących ich sąsiadami):
    * Każda żywa komórka z mniej niż dwoma żywymi sąsiadami umiera z powodu zbyt małego zaludnienia.
    * Każda żywa komórka z dwoma lub trzema żywymi sąsiadami żyje dalej.
    * Każda żywa komórka z więcej niż trzema żywymi sąsiadami umiera z powodu zbyt dużego zaludnienia.
    * Każda martwa komórka ożywa, kiedy ma dokładnie trzech żywych sąsiadów.

Użytkownik powinien zadeklarować, na jakiej planszy chce oglądać animacje (podając jej szerokość i wysokość). Powinna wyświetlić mu się plansza ze startową animacją (np. pojedynczym gliderem), na której może on za pomocą kliknięcia myszką włączać i wyłączać poszczególne pola. Poniżej planszy powinny znajdować się przycisk START i PAUZA, które będą uruchamiać lub zatrzymać animację w danym stanie, aby w każdym momencie użytkownik mógł zatrzymać animację, zmienić jej stan i włączyć ją na nowo. 

**Opiszmy najpierw metody, które musi wykonywać nasz program:**
1. Metoda, która buduje odpowiednią planszę na podstawie podanych wartości szerokości i wysokości (ograniczyć wysokość i szerokość w pikselach, stworzyć i dodać do DOMu odpowiednią ilość divów, zapisać je wszystkie do ciągu i dodać im event umożliwiający zmianę ich stanu po kliknięciu myszką).
2. Metoda wyświetlająca stan początkowy (np. z pojedynczym gliderem) – do tego potrzebować będziemy metody do poruszania się po ciągu divów za pomocą współrzędnych x, y i metody `setCellState`, która przyjmuje parametry x, y i state.
5. Metoda `computeCellNextState` przyjmujące parametry x i y, która na podstawie stanu tej komórki oraz stanu jej sąsiadów oblicza, czy ma ona przeżyć, czy umrzeć, czy ożyć.
6. Metoda `computeNextGeneration`, która na podstawie aktualnego stanu wszystkich komórek stworzy i zapisze do zmiennej tempGeneration nowy stan całej planszy (używając computeCellNextState).
7. Metoda `printNextGeneration`, która zastąpi obecny stan wszystkich komórek nowym stanem (przechowywanym w `tempGeneration`).
8. Metody `start` (w której zawrzemy wszystkie kroki początkowe), `play` (obsługująca event kliknięcia na button 'play' uruchomieniem animacji) i `pause` (obsługująca event kliknięcia na button 'pause' zatrzymaniem animacji).


I tyle! Przejdziemy teraz powoli przez wszystkie te kroki, ale jeśli czujesz się na siłach móżesz spróbować napisać ten program tylko na podstawie powyższego skróconego opisu.

##1. Przygotowanie pliku z JavaScriptem
* W głównym katalogu projektu utwórz katalog o nazwie js. Wewnątrz tego katalogu utwórz plik app.js. Podepnij ten plik do dokumentu HTML. W pliku app.js utwórz obsługę zdarzenia DOMContentLoaded i sprawdź, czy działa.

##2. Tworzenie obiektu zarządzającego grą
Będziemy ćwiczyć programownie obiektowe, a więc całą naszą grę napiszemy jako obiekt `GameOfLife()`, który będzie zawierał informacje o planszy i metody do zarządzania grą. W tym celu w pliku app.js:

* Utwórz konstruktor dla obiektów `GameOfLife, który powinien tworzyć naszą grę przyjmując parametry `boardWidth` i `boardHeight`. Zdefiniuj mu następujące właściwości:
    * width: wartość parametru boardWidth
    * height: wartość parametru boardHeight
* Aby przetestować poprawność działania konstruktora zapisz do zmiennej `game` nowy obiekt typu `GameOfLife` z dowolnymi paramterami (np. 10, 10). Wypisz na konsoli zmienną `game` i sprawdź, czy obiekt ten przechowuje podane przez Ciebie wartości.

**Pamiętaj o odpowiednim użyciu słowa kluczowego this wewnątrz obiektu!**

##2. Budowanie planszy 
Zajrzyj do pliku index.html. Znajdziesz tam przygotowane dwie sekcje oraz dwa guziki do obsługi animacji.
Zajrzyj też do pliku style.css, znajdującego się w katalogu css. Znajdziesz tam prototyp pliku ze stylami do naszej gry – każde pole planszy to div w sekcji `#board`, który zajmuje 10px szerokości i 10px wysokości. Podepnij plik CSS do dokumentu HTML.

Naszą planszą będzie stworzona i dodana do DOMu za pomocą JavaScriptu odpowiednią ilość divów. W tym celu:

* dodaj do obiektu typu `GameOfLife` atrybut `board` i złap do tej zmiennej odpowiedni element DOMu (sekcję, w której ma się wyświetlić nasza plansza). Użyj metody łapiącej element za pomocą jego `id`.
* utwórz metodę `createBoard()`, która:
    * nada sekcji `#board` odpowiednią wysokość i szerokość (na podstawie atrybutu width i height oraz wielkości pojedynczego diva)
    * zapisze do zmiennej ilość wszystkich pól, które mają się znaleźć na planszy (jako wynik mnożenia atrybutów wysokość i szerokość naszego obiektu)
    * za pomocą pętli stworzy odpowiednią ilość divów i doda je do sekcji #board

Dzięki zastosowaniu `float: left` i ograniczeniu szerokości sekcji `#board` nasza plansza wygląda jak tablica dwuwymiarowa (wysokość i szerokość), ale de facto jest jednym ciągiem divów. Dla łatwiejszego poruszania się po nich zapiszmy ten ciąg do zmiennej. W tym celu:

* dodaj do naszego obiektu atrybut `this.cells` i zdefiniuj go jako pusty ciąg
* w metodzie `createBoard()` po stworzeniu i dodaniu wszystkich divów do DOMu złap je do stworzonej już zmiennej `this.cells` 

Podejrzyj plik index.html w przeglądarce. Jeśli wszystko zrobiłeś poprawnie, powinieneś zobaczyć planszę o wymiarach zdefiniowanych przez Ciebie przy powoływaniu obiektu `GameOfLife()` do zmiennej `game`.

##3. Ożywianie i uśmiercanie komórek poprzez kliknięcie myszką

Kliknięcie w martwą komórkę powinno ją ożywić i odwrotnie. Zajrzyj jeszcze raz do pliku style.css – przygotwaliśmy tam klasę `live`, która zmienia kolor komórki. Musimy dodać event do wszystkich elementów DOM, które są naszymi komórkami. Zrobimy to zaraz po stworzeniu tych elementów. W tym celu:

* w metodzie `createBoard()` przeiteruj się po wszystkich elementach zapisanych do atrybutu `this.cells` i dodaj im event na kliknięcie
* kliknięcie powinno przełączać (dodawać lub odejmować) danemu divowi klasę `live`

##4. Wskazywanie danej komórki za pomocą współrzędnych x i y

W tym momencie możemy wskazać konkretną komórkę tylko poprez jej indeks w ciągu, mieszczący się w przedziale od 0 do width*height. Jednak komórki mają żyć lub umierać w zależności od swoich sąsiadów, których najlepiej określić jako:

    dla komórki o współrzędnych x, y:

    1. sąsiad: x-1, y-1
    2. sąsiad: x, y-1
    3. sąsiad: x+1, y1
    4. sąsiad: x-1, y
    5. sąsiad: x+1, y
    6. sąsiad: x-1, y+1
    7. sąsiad: x, y+1
    8. sąsiad: x+1, y+1

Do obiektu dodaj metodę, która przeliczy współrzędne **x** i **y** na indeks tablicy wg. odpowiedniego wzoru. Metoda powinna zwracać element `<div>` o podanych współrzędnych. 

*podpowiedź:*

indeks = x + y * width;

##5. Zdefiniowanie stanu początkowego

Aby łatwiej nam było sprawdzać, czy dobrze programujemy naszą animację stwórzmy metodę, która wyświetli nam w lewym górnym rogu planszy [glidera](https://en.wikipedia.org/wiki/Glider_(Conway%27s_Life)#/media/File:Animated_glider_emblem.gif). W tym celu:

* potrzebna nam będzie metoda `setCellState(x, y, state), która komórce o zadanych współrzędnych zmieni stan na podany za pomocą prostego wyrażenia warunkowego i usuwania i dodawania odpowiedniej klasy
* 




##6. Kroki programu

Żeby poprawnie zastosować założenia Conwaya, musimy w tym samym momencie zmienić stan wszystkich komórek na nowy (błędem byłoby zmienianie każdej komórki po kolei, bo przed chwilą zmieniona wpływałaby na zmianę kolejnej, jako jej sąsiada). Zaplanujmy więc kroki, które musimy wykonywać, żeby animacja działała poprawnie:

* wyliczenie przyszłego stanu komórki o współrzędnych x i y na podstawie jej sąsiadów
* zapisanie do zmiennej (np. `nextGeneration`) wyliczonych przyszłych stanów wszystkich komórek po kolei
* ustawienie nowego wyglądu komórki o współrzędnych x i y na podstawie danych z tej zmiennej
* zastąpienie wyglądu tablicy wynikiem zapisanym w tej zmiennej

Musimy więc stworzyć 3 metody (dwie do ustalania przyszłego stanu i dwie do rysowania nowego stanu planszy):
    
    computeCellNextState(x, y)
    computeNextGeneration()
    printNextGeneration()

Uwaga: żeby testować działanie pisanych metod ustawmy tymczasowo wydarzenie na przycisku play, które po kliknięciu pokazuje kolejny krok animacji (czyli `PrintNextGeneration();`). 



##7. Guziki Play i pause
