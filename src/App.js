import React, {useState} from 'react';
import './App.css';


const Page = () => {
    const [value, setValue] = useState(['1']);
    console.log(value); // 输出用户选择图片 id。
    let pictures = [
        {
            id: '1',
            name: 'foo1',
            url: 'https://gw.alipayobjects.com/mdn/rms_d212b7/afts/img/A*LlfeSa8N0WgAAAAAAAAAAABkARQnAQ'
        },
        {
            id: '2',
            name: 'foo2',
            url: 'https://gw.alipayobjects.com/mdn/rms_d212b7/afts/img/A*LlfeSa8N0WgAAAAAAAAAAABkARQnAQ'
        },
        {
            id: '3',
            name: 'foo3',
            url: 'https://gw.alipayobjects.com/mdn/rms_d212b7/afts/img/A*LlfeSa8N0WgAAAAAAAAAAABkARQnAQ'
        },
    ];
    return <PictureSelect pictures={pictures} value={value} onChange={(value) => setValue(value)}/>
};

function PictureSelect(props) {
    const {value, pictures, onChange} = props;
    function onSelected(id) {
        let selectValue = value.slice();
        if (selectValue.indexOf(id) === -1) {
            selectValue.push(id);
        } else {
            selectValue.splice(selectValue.indexOf(id), 1)
        }
        setCheckboxSelected(selectValue);
        onChange(selectValue)
    }

    function onSelectedAll() {
        let selectValue = value.slice();
        if (selectValue.length < 3) {
            selectValue = pictures.map(v => {
                return v.id
            })
        } else {
            selectValue = []
        }
        setCheckboxSelected(selectValue)
        onChange(selectValue)
    }

    function setCheckboxSelected(selectValue) {
        // console.log(selectValue)
        var boxes = document.getElementsByName("selectIcon");
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].checked = selectValue.indexOf(boxes[i].value) !== -1;
        }
        var selectedAll = document.getElementsByName("selectedAll");
        selectedAll[0].checked = selectValue.length === pictures.length;
    }

    return <div className="picture-select">
        <div className='picture-select-all' onClick={() => onSelectedAll()}>
            <input name='selectedAll' type="checkbox" defaultChecked={value.length === pictures.length}/>
            已选中{value.length}个文件
        </div>
        <div className='picture-select-items'>
            {
                pictures.map(v => {
                    return (<div key={v.id} className='picture-select-item'>
                        <div className='picture-select-item-top'>
                            <img className="picture-select-item-img" src={v.url} onClick={() => onSelected(v.id)}/>
                            <input name="selectIcon" type="checkbox" className="picture-select-item-check" value={v.id}
                                   defaultChecked={value.indexOf(v.id) !== -1}/>
                        </div>
                        <div className="picture-select-item-name">{v.name}</div>
                    </div>)
                })
            }
        </div>
    </div>
}

export default Page;
