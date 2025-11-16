class MyHashMap() {
    private val size = 10007
    private val table = Array<MutableList<Pair<Int, Int>>>(size) { mutableListOf() }

    private fun hash(key: Int) = key % size

    fun put(key: Int, value: Int) {
        val idx = hash(key)
        for (i in table[idx].indices) {
            if (table[idx][i].first == key) {
                table[idx][i] = Pair(key, value)
                return
            }
        }
        table[idx].add(Pair(key, value))
    }

    fun get(key: Int): Int {
        val idx = hash(key)
        for ((k, v) in table[idx]) {
            if (k == key) return v
        }
        return -1
    }

    fun remove(key: Int) {
        val idx = hash(key)
        val iter = table[idx].iterator()
        while (iter.hasNext()) {
            if (iter.next().first == key) {
                iter.remove()
                return
            }
        }
    }
}
