// 事件名称中文映射
const eventNameMap = {
    "wind": "风事件",
    "stolen_underwear": "内衣被盗事件",
    "living_clothes": "触手服图书室事件",
    "living_clothes2": "触手服地下城事件",
    "goblin1": "落单哥布林事件1",
    "goblin2": "哥布林陷阱事件",
    "goblin3": "落单哥布林事件2",
    "goblin4": "哥布林小队事件",
    "goblin5": "哥布林法师事件",
    "goblin_village": "闯入哥布林村事件",
    "goblin_village2": "哥布林村讨伐计划事件",
    "welcome": "公会欢迎事件",
    "guild_leader": "公会会长授课事件1",
    "guild_leader2": "公会会长授课事件2",
    "guild_leader3": "公会会长授课事件3",
    "guild_leader_exhibition": "与会长街头露出事件",
    "guild_leader_drink": "会长喝茶事件",
    "guild_trainer": "公会教官训练事件1",
    "guild_trainer2": "公会教官训练事件2",
    "guild_trainer3": "公会教官训练事件3",
    "guild_trainer4": "公会教官训练事件4",
    "guild_trainer5": "公会教官训练事件5",
    "weakness": "认识弱点特训事件1",
    "weakness2": "认识弱点特训事件2",
    "weakness3": "认识弱点特训事件3",
    "weakness4": "认识弱点特训事件4"
};

// 状态名称中文映射
const statusNameMap = {
    "name": "名字",
    "lv": "等级",
    "exp": "经验",
    "str": "力量",
    "dex": "敏捷",
    "wis": "智力",
    "money": "金钱",
    "pay": "支出",
    "lewd": "淫乱",
    "lust": "欲望",
    "adv": "冒险者等级",
    "v_virgin": "初体验",
    "o_virgin": "初吻",
    "a_virgin": "后庭初体验",
    "v_exp": "阴道经验",
    "o_exp": "口腔经验",
    "b_exp": "胸部经验",
    "a_exp": "菊穴经验",
    "e_exp": "露出经验",
    "v_lv": "阴道开发",
    "o_lv": "口腔开发",
    "b_lv": "胸部开发",
    "a_lv": "菊穴开发",
    "m_exp": "自慰经验",
    "m_lv": "自慰中毒",
    "e_lv": "露出癖",
    "u_lv": "尿道开发",
    "u_exp": "尿道经验",
    "p_lv": "受虐狂",
    "p_exp": "受虐经验",
    "s_exp": "精液经验",
    "s_lv": "精液中毒",
    "les_exp": "百合经验",
    "les_lv": "百合中毒",
    "orgasm": "高潮经验",
    "birth_exp": "出产经验"
};

// 跟踪事件的禁用状态和原始触发概率函数
const disabledEvents = {};
const originalChanceFunctions = {};

// 初始化事件的原始触发概率函数
function initOriginalChanceFunctions() {
    for (let eventName in ev) {
        originalChanceFunctions[eventName] = ev[eventName].chance;
    }
}

// 打开设置页面
function openSettings() {
    document.getElementById('settings').style.display = 'block';
    // 初始化事件禁用下拉列表
    initEventDisableSelect();
    // 初始化数值选择下拉列表
    initValueSelect();
    // 初始化状态选择下拉列表
    initStatusSelect();
    // 初始化原始触发概率函数
    initOriginalChanceFunctions();
}

// 关闭设置页面
function closeSettings() {
    document.getElementById('settings').style.display = 'none';
}

// 初始化事件禁用下拉列表
function initEventDisableSelect() {
    const eventDisableSelect = document.getElementById('event-disable-select');
    eventDisableSelect.innerHTML = '';
    for (let eventName in ev) {
        const option = document.createElement('option');
        option.value = eventName;
        const isDisabled = disabledEvents[eventName] || ev[eventName].chance.toString() === function () { return 0; }.toString();
        const statusText = isDisabled ? '（已禁用）' : '（启用）';
        option.textContent = (eventNameMap[eventName] || eventName) + statusText;
        eventDisableSelect.appendChild(option);
    }
}

// 禁用选中事件
function disableSelectedEvent() {
    const eventDisableSelect = document.getElementById('event-disable-select');
    const selectedEvent = eventDisableSelect.value;
    disableEvent(selectedEvent);
    initEventDisableSelect(); // 更新下拉列表显示
}

// 启用选中事件
function enableSelectedEvent() {
    const eventDisableSelect = document.getElementById('event-disable-select');
    const selectedEvent = eventDisableSelect.value;
    enableEvent(selectedEvent);
    initEventDisableSelect(); // 更新下拉列表显示
}

// 禁用事件
function disableEvent(eventName) {
    if (ev[eventName]) {
        ev[eventName].chance = function () {
            return 0;
        };
        disabledEvents[eventName] = true;
    }
}

// 启用事件
function enableEvent(eventName) {
    if (ev[eventName] && originalChanceFunctions[eventName]) {
        ev[eventName].chance = originalChanceFunctions[eventName];
        delete disabledEvents[eventName];
    }
}

// 初始化数值选择下拉列表
function initValueSelect() {
    const valueSelect = document.getElementById('value-select');
    valueSelect.innerHTML = '';
    for (let key in status) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = statusNameMap[key] || key;
        valueSelect.appendChild(option);
    }
}

// 修改数值
function modifyValue() {
    const valueSelect = document.getElementById('value-select');
    const valueInput = document.getElementById('value-input');
    const selectedKey = valueSelect.value;
    const newValue = parseInt(valueInput.value);
    if (!isNaN(newValue)) {
        status[selectedKey] = newValue;
    }
}

// 初始化状态选择下拉列表
function initStatusSelect() {
    const statusSelect = document.getElementById('status-select');
    statusSelect.innerHTML = '';
    for (let key in buff) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = statusNameMap[key] || key;
        statusSelect.appendChild(option);
    }
}

// 添加状态
function addStatus() {
    const statusSelect = document.getElementById('status-select');
    const selectedStatus = statusSelect.value;
    gainbuff(selectedStatus, 1);
}

// 移除状态
function removeStatus() {
    const statusSelect = document.getElementById('status-select');
    const selectedStatus = statusSelect.value;
    gainbuff(selectedStatus, -10000);
}