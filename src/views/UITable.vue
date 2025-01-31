<script setup>
const tableValues = {
  userName: 'AIMMO',
  id: 'wynn',
  plan: 'Primium'
}
const columns = [
  { head: '회사명', name: 'userName', type: 'string' },
  { head: '아이디', name: 'id', type: 'string'},
  { head: '플랜', name: 'plan', type: 'tag'}
]
</script>

<template>
  <div class="container1">
    <div class="table-wrapper">
      <div class="table-title">회사정보</div>
      <table class="ga-table">
        <tbody>
          <tr v-for="col in columns" :key="col.name">
            <td class="label col-3 bold">{{ col.head }}</td>
            <td>
              <!-- type: tag -->
              <template v-if="col.type === 'tag'">
                <div class="ga-button circle badge deepblue ">{{ tableValues[col.name] }}
                  <span class="in-badge secondary">10</span>
                </div>
              </template>
              <!-- string, text, number-strung -->
              <template v-else>
                {{ tableValues[col.name] }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.table-wrapper {
  background-color: #454545;
  color: #333;
  width: 600px;
  .table-title {
    border-radius: 4px;
    margin: 0;
    background-color: #333;
    color: #fff;
    font-weight: 700;
  }
  .ga-table {
    border: 0;
    margin: 0;
    border-collapse: collapse;
    td.label {
      background-color: #454545;
      color: #fff;
    }
    // tr {
    //   &:hover {
    //     background-color: #454545;
    //     td {
    //       color: #fff;
    //     }
    //   }
    // }
  }
}

</style>