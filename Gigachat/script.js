 document.addEventListener('DOMContentLoaded', () => {
    const bins = document.querySelectorAll('.bin');
    const items = document.querySelectorAll('.item');

    function selectLevel(levelNumber) {
        document.getElementById("splash-screen").style.display = "none";
        document.getElementById("game-screen").style.display = "block";
    }

    function returnToMenu() {
        document.getElementById("splash-screen").style.display = "block";
        document.getElementById("game-screen").style.display = "none";
    }

    // Функция проверки попадания объекта в правильный контейнер
    function checkSort(event, draggedItem) {
        let targetBin = event.target.closest('.bin');
        if (!targetBin) return false;

        const correctBinType = determineBin(draggedItem.classList.value.split(' ').pop());
        console.log(`Правильный тип бака: ${correctBinType}`);

        if (targetBin.classList.contains(correctBinType)) {
            draggedItem.style.visibility = 'hidden';
            alert('Верно!');
        } else {
            alert('Неверно!');
        }
    }

    // Определяем правильный тип бака по классу элемента
    function determineBin(itemClass) {
        switch (itemClass) {
            case 'banana': return 'organic'; break;
            case 'plastic-bottle': return 'plastic'; break;
            case 'newspaper': return 'paper'; break;
            default: return '';
        }
    }

    // Обработчики перетаскивания
    items.forEach((item) => {
        item.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', event.target.id);
        });
    });

    bins.forEach((bin) => {
        bin.addEventListener('dragenter', (event) => {
            event.preventDefault();
            event.target.style.opacity = '1';
        });

        bin.addEventListener('dragleave', (event) => {
            event.target.style.opacity = '0.8';
        });

        bin.addEventListener('dragover', (event) => {
            event.preventDefault(); // Необходимый метод для принятия объектов
        });

        bin.addEventListener('drop', (event) => {
            event.preventDefault();
            const draggedItemID = event.dataTransfer.getData('text/plain');
            const draggedItem = document.getElementById(draggedItemID);
            checkSort(event, draggedItem);
        });
    });
});