<template>
  <div class="calendar">
    <header class="header">
      <span class="header__title"
        >{{ currentMonthLabel }} {{ currentYear }}</span
      >
      <div class="header__buttons">
        <button @click="previousMonth">&lt;</button>
        <button @click="nextMonth">&gt;</button>
      </div>
    </header>
    <div class="headings" v-for="(dayLabel, index) in dayLabels" :key="index">
      {{ dayLabel }}
    </div>
    <div v-for="day in dates" class="day" :class="dayClassObj(day)">
      <button @click="setSelectedDate(day)">
        <span>{{ day.date | formatDateToDay }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import {
  startOfMonth,
  lastDayOfMonth,
  getDay,
  addDays,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  isSameDay,
  addMonths,
  getMonth,
  setMonth,
  format
} from "date-fns";

import "./style.sass";

const DAY_LABELS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const MONTH_LABELS = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь"
];
export default {
  data() {
    return {
      today: null,
      selectedDate: null,
      currDateCursor: null,
      dayLabels: null
    };
  },
  created() {
    this.dayLabels = DAY_LABELS.slice();
    this.today = this.startDate;
    this.selectedDate = this.today;
    this.currDateCursor = this.today;
  },
  props: {
    startDate: {
      type: Date,
      required: false,
      default: function() {
        return new Date();
      }
    },
    tasks: {
      type: Array,
      required: false
    }
  },
  computed: {
    currentMonth() {
      return this.currDateCursor.getMonth();
    },
    currentYear() {
      return this.currDateCursor.getFullYear();
    },
    currentMonthLabel() {
      return MONTH_LABELS[this.currentMonth];
    },
    dates() {
      const cursorDate = this.currDateCursor;
      let startDate = startOfMonth(cursorDate),
        endDate = lastDayOfMonth(cursorDate);
      const daysNeededForLastMonth = getDay(startDate),
        daysNeededForNextMonth =
          7 - (getDay(endDate) + 1) > 6 ? 0 : 7 - getDay(endDate) - 1;
      startDate = addDays(startDate, -daysNeededForLastMonth);
      endDate = addDays(endDate, daysNeededForNextMonth);

      return eachDayOfInterval({ start: startDate, end: endDate }).map(
        date => ({
          date,
          isCurrentMonth: isSameMonth(cursorDate, date),
          isToday: isToday(date),
          isSelected: isSameDay(this.selectedDate, date),
          isActive: this.tasks.some(x => isSameDay(x.date, date))
        })
      );
    }
  },
  mounted() {
    if (this.startDate) {
      this.currDateCursor = this.startDate;
      this.selectedDate = this.startDate;
    }
  },
  methods: {
    dayClassObj(day) {
      return {
        today: day.isToday,
        current: day.isCurrentMonth,
        selected: day.isSelected,
        active: day.isActive
      };
    },
    nextMonth() {
      this.currDateCursor = addMonths(this.currDateCursor, 1);
      this.$emit("changeMonth", this.currDateCursor);
    },
    previousMonth() {
      this.currDateCursor = addMonths(this.currDateCursor, -1);
      this.$emit("changeMonth", this.currDateCursor);
    },
    setSelectedDate(day) {
      this.selectedDate = day.date;
      this.$emit("changeDay", this.selectedDate);
      if (!day.isCurrentMonth) {
        const selectedMonth = getMonth(this.selectedDate);
        this.currDateCursor = setMonth(this.currDateCursor, selectedMonth);
      }
    }
  },
  filters: {
    formatDateToDay(val) {
      return format(val, "d");
    }
  }
};
</script>
