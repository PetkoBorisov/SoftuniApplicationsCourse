function solution() {
    let url = 'http://localhost:3030/jsonstore/advanced/articles/list';
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            console.log(data);

            for (key in data) {
                let _id = data[key]._id;
                let title = data[key].title;
                let mainSection = document.getElementById('main');

                let accordionDivElement = document.createElement('div');
                accordionDivElement.classList.add('accordion');

                let headDivElement = document.createElement('div');
                headDivElement.classList.add('head');

                let titleSpanElement = document.createElement('span');
                titleSpanElement.textContent = title;

                let extraParagraphElement = document.createElement('p');
                let extraUrl = `http://localhost:3030/jsonstore/advanced/articles/details/${_id}`;
                fetch(extraUrl)
                    .then(res => res.json())
                    .then((data) => {
                        extraParagraphElement.textContent = data.content;
                    }).catch((err) => {
                        console.log(err);
                    })



                let moreButtonElement = document.createElement('button');
                moreButtonElement.classList.add('button');
                moreButtonElement.id = _id;
                moreButtonElement.textContent = 'More';
                moreButtonElement.addEventListener('click', (e) => {


                    let accordionParts = e.currentTarget.parentElement.parentElement.children;



                    if (accordionParts[1].style.display == '') {

                        accordionParts[1].style.display = 'block';
                        e.currentTarget.textContent = 'Less';
                    }
                    else if (accordionParts[1].style.display != '') {

                        accordionParts[1].style.display = '';
                        e.currentTarget.textContent = 'More';
                    }


                })








                let extraDivElement = document.createElement('div');
                extraDivElement.classList.add('extra');


                headDivElement.appendChild(titleSpanElement);
                headDivElement.appendChild(moreButtonElement);

                extraDivElement.appendChild(extraParagraphElement);

                accordionDivElement.appendChild(headDivElement);
                accordionDivElement.appendChild(extraDivElement);

                mainSection.appendChild(accordionDivElement);




            }

        })
}
solution();