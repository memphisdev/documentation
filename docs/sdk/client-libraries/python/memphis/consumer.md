---
title: memphis.consumer
---

<main class="pdoc">
<section class="module-info">
<h1 class="modulename">
<a href="./../memphis.html">memphis</a><wbr>.consumer    </h1>


<input id="mod-consumer-view-source" class="view-source-toggle-state" type="checkbox" aria-hidden="true" tabindex="-1">

<label class="view-source-button" for="mod-consumer-view-source"><span>View Source</span></label>

<div class="pdoc-code codehilite"><pre><span></span><span id="L-1"><a href="#L-1"><span class="linenos">  1</span></a><span class="kn">from</span> <span class="nn">__future__</span> <span class="kn">import</span> <span class="n">annotations</span>
</span><span id="L-2"><a href="#L-2"><span class="linenos">  2</span></a>
</span><span id="L-3"><a href="#L-3"><span class="linenos">  3</span></a><span class="kn">import</span> <span class="nn">asyncio</span>
</span><span id="L-4"><a href="#L-4"><span class="linenos">  4</span></a><span class="kn">import</span> <span class="nn">json</span>
</span><span id="L-5"><a href="#L-5"><span class="linenos">  5</span></a>
</span><span id="L-6"><a href="#L-6"><span class="linenos">  6</span></a><span class="kn">from</span> <span class="nn">memphis.exceptions</span> <span class="kn">import</span> <span class="n">MemphisError</span>
</span><span id="L-7"><a href="#L-7"><span class="linenos">  7</span></a><span class="kn">from</span> <span class="nn">memphis.utils</span> <span class="kn">import</span> <span class="n">default_error_handler</span><span class="p">,</span> <span class="n">get_internal_name</span>
</span><span id="L-8"><a href="#L-8"><span class="linenos">  8</span></a><span class="kn">from</span> <span class="nn">memphis.message</span> <span class="kn">import</span> <span class="n">Message</span>
</span><span id="L-9"><a href="#L-9"><span class="linenos">  9</span></a>
</span><span id="L-10"><a href="#L-10"><span class="linenos"> 10</span></a>
</span><span id="L-11"><a href="#L-11"><span class="linenos"> 11</span></a><span class="k">class</span> <span class="nc">Consumer</span><span class="p">:</span>
</span><span id="L-12"><a href="#L-12"><span class="linenos"> 12</span></a>    <span class="n">MAX_BATCH_SIZE</span> <span class="o">=</span> <span class="mi">5000</span>
</span><span id="L-13"><a href="#L-13"><span class="linenos"> 13</span></a>
</span><span id="L-14"><a href="#L-14"><span class="linenos"> 14</span></a>    <span class="k">def</span> <span class="fm">__init__</span><span class="p">(</span>
</span><span id="L-15"><a href="#L-15"><span class="linenos"> 15</span></a>        <span class="bp">self</span><span class="p">,</span>
</span><span id="L-16"><a href="#L-16"><span class="linenos"> 16</span></a>        <span class="n">connection</span><span class="p">,</span>
</span><span id="L-17"><a href="#L-17"><span class="linenos"> 17</span></a>        <span class="n">station_name</span><span class="p">:</span> <span class="nb">str</span><span class="p">,</span>
</span><span id="L-18"><a href="#L-18"><span class="linenos"> 18</span></a>        <span class="n">consumer_name</span><span class="p">,</span>
</span><span id="L-19"><a href="#L-19"><span class="linenos"> 19</span></a>        <span class="n">consumer_group</span><span class="p">,</span>
</span><span id="L-20"><a href="#L-20"><span class="linenos"> 20</span></a>        <span class="n">pull_interval_ms</span><span class="p">:</span> <span class="nb">int</span><span class="p">,</span>
</span><span id="L-21"><a href="#L-21"><span class="linenos"> 21</span></a>        <span class="n">batch_size</span><span class="p">:</span> <span class="nb">int</span><span class="p">,</span>
</span><span id="L-22"><a href="#L-22"><span class="linenos"> 22</span></a>        <span class="n">batch_max_time_to_wait_ms</span><span class="p">:</span> <span class="nb">int</span><span class="p">,</span>
</span><span id="L-23"><a href="#L-23"><span class="linenos"> 23</span></a>        <span class="n">max_ack_time_ms</span><span class="p">:</span> <span class="nb">int</span><span class="p">,</span>
</span><span id="L-24"><a href="#L-24"><span class="linenos"> 24</span></a>        <span class="n">max_msg_deliveries</span><span class="p">:</span> <span class="nb">int</span> <span class="o">=</span> <span class="mi">10</span><span class="p">,</span>
</span><span id="L-25"><a href="#L-25"><span class="linenos"> 25</span></a>        <span class="n">error_callback</span><span class="o">=</span><span class="kc">None</span><span class="p">,</span>
</span><span id="L-26"><a href="#L-26"><span class="linenos"> 26</span></a>        <span class="n">start_consume_from_sequence</span><span class="p">:</span> <span class="nb">int</span> <span class="o">=</span> <span class="mi">1</span><span class="p">,</span>
</span><span id="L-27"><a href="#L-27"><span class="linenos"> 27</span></a>        <span class="n">last_messages</span><span class="p">:</span> <span class="nb">int</span> <span class="o">=</span> <span class="o">-</span><span class="mi">1</span><span class="p">,</span>
</span><span id="L-28"><a href="#L-28"><span class="linenos"> 28</span></a>    <span class="p">):</span>
</span><span id="L-29"><a href="#L-29"><span class="linenos"> 29</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">connection</span> <span class="o">=</span> <span class="n">connection</span>
</span><span id="L-30"><a href="#L-30"><span class="linenos"> 30</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">station_name</span> <span class="o">=</span> <span class="n">station_name</span><span class="o">.</span><span class="n">lower</span><span class="p">()</span>
</span><span id="L-31"><a href="#L-31"><span class="linenos"> 31</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">consumer_name</span> <span class="o">=</span> <span class="n">consumer_name</span><span class="o">.</span><span class="n">lower</span><span class="p">()</span>
</span><span id="L-32"><a href="#L-32"><span class="linenos"> 32</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">consumer_group</span> <span class="o">=</span> <span class="n">consumer_group</span><span class="o">.</span><span class="n">lower</span><span class="p">()</span>
</span><span id="L-33"><a href="#L-33"><span class="linenos"> 33</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">pull_interval_ms</span> <span class="o">=</span> <span class="n">pull_interval_ms</span>
</span><span id="L-34"><a href="#L-34"><span class="linenos"> 34</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">batch_size</span> <span class="o">=</span> <span class="n">batch_size</span>
</span><span id="L-35"><a href="#L-35"><span class="linenos"> 35</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">batch_max_time_to_wait_ms</span> <span class="o">=</span> <span class="n">batch_max_time_to_wait_ms</span>
</span><span id="L-36"><a href="#L-36"><span class="linenos"> 36</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">max_ack_time_ms</span> <span class="o">=</span> <span class="n">max_ack_time_ms</span>
</span><span id="L-37"><a href="#L-37"><span class="linenos"> 37</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">max_msg_deliveries</span> <span class="o">=</span> <span class="n">max_msg_deliveries</span>
</span><span id="L-38"><a href="#L-38"><span class="linenos"> 38</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">ping_consumer_interval_ms</span> <span class="o">=</span> <span class="mi">30000</span>
</span><span id="L-39"><a href="#L-39"><span class="linenos"> 39</span></a>        <span class="k">if</span> <span class="n">error_callback</span> <span class="ow">is</span> <span class="kc">None</span><span class="p">:</span>
</span><span id="L-40"><a href="#L-40"><span class="linenos"> 40</span></a>            <span class="n">error_callback</span> <span class="o">=</span> <span class="n">default_error_handler</span>
</span><span id="L-41"><a href="#L-41"><span class="linenos"> 41</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">t_ping</span> <span class="o">=</span> <span class="n">asyncio</span><span class="o">.</span><span class="n">create_task</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">__ping_consumer</span><span class="p">(</span><span class="n">error_callback</span><span class="p">))</span>
</span><span id="L-42"><a href="#L-42"><span class="linenos"> 42</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">start_consume_from_sequence</span> <span class="o">=</span> <span class="n">start_consume_from_sequence</span>
</span><span id="L-43"><a href="#L-43"><span class="linenos"> 43</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">last_messages</span> <span class="o">=</span> <span class="n">last_messages</span>
</span><span id="L-44"><a href="#L-44"><span class="linenos"> 44</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">context</span> <span class="o">=</span> <span class="p">{}</span>
</span><span id="L-45"><a href="#L-45"><span class="linenos"> 45</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">dls_messages</span> <span class="o">=</span> <span class="p">[]</span>
</span><span id="L-46"><a href="#L-46"><span class="linenos"> 46</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">dls_current_index</span> <span class="o">=</span> <span class="mi">0</span>
</span><span id="L-47"><a href="#L-47"><span class="linenos"> 47</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">dls_callback_func</span> <span class="o">=</span> <span class="kc">None</span>
</span><span id="L-48"><a href="#L-48"><span class="linenos"> 48</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">t_dls</span> <span class="o">=</span> <span class="n">asyncio</span><span class="o">.</span><span class="n">create_task</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">__consume_dls</span><span class="p">())</span>
</span><span id="L-49"><a href="#L-49"><span class="linenos"> 49</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">t_consume</span> <span class="o">=</span> <span class="kc">None</span>
</span><span id="L-50"><a href="#L-50"><span class="linenos"> 50</span></a>
</span><span id="L-51"><a href="#L-51"><span class="linenos"> 51</span></a>    <span class="k">def</span> <span class="nf">set_context</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">context</span><span class="p">):</span>
</span><span id="L-52"><a href="#L-52"><span class="linenos"> 52</span></a><span class="w">        </span><span class="sd">&quot;&quot;&quot;Set a context (dict) that will be passed to each message handler call.&quot;&quot;&quot;</span>
</span><span id="L-53"><a href="#L-53"><span class="linenos"> 53</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">context</span> <span class="o">=</span> <span class="n">context</span>
</span><span id="L-54"><a href="#L-54"><span class="linenos"> 54</span></a>
</span><span id="L-55"><a href="#L-55"><span class="linenos"> 55</span></a>    <span class="k">def</span> <span class="nf">consume</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">callback</span><span class="p">):</span>
</span><span id="L-56"><a href="#L-56"><span class="linenos"> 56</span></a><span class="w">        </span><span class="sd">&quot;&quot;&quot;</span>
</span><span id="L-57"><a href="#L-57"><span class="linenos"> 57</span></a><span class="sd">        This method starts consuming events from the specified station and invokes the provided callback function for each batch of messages received.</span>
</span><span id="L-58"><a href="#L-58"><span class="linenos"> 58</span></a>
</span><span id="L-59"><a href="#L-59"><span class="linenos"> 59</span></a><span class="sd">        Parameters:</span>
</span><span id="L-60"><a href="#L-60"><span class="linenos"> 60</span></a><span class="sd">            callback (function): A function that will be called with each batch of messages received. The function should have the following signature:</span>
</span><span id="L-61"><a href="#L-61"><span class="linenos"> 61</span></a><span class="sd">                - `callback(messages: List[Message], error: Optional[MemphisError], context: Dict) -&gt; Awaitable[None]`</span>
</span><span id="L-62"><a href="#L-62"><span class="linenos"> 62</span></a><span class="sd">                - `messages`: A list of `Message` objects representing the batch of messages received.</span>
</span><span id="L-63"><a href="#L-63"><span class="linenos"> 63</span></a><span class="sd">                - `error`: An optional `MemphisError` object if there was an error while consuming the messages.</span>
</span><span id="L-64"><a href="#L-64"><span class="linenos"> 64</span></a><span class="sd">                - `context`: A dictionary representing the context that was set using the `set_context()` method.</span>
</span><span id="L-65"><a href="#L-65"><span class="linenos"> 65</span></a>
</span><span id="L-66"><a href="#L-66"><span class="linenos"> 66</span></a><span class="sd">        Example:</span>
</span><span id="L-67"><a href="#L-67"><span class="linenos"> 67</span></a><span class="sd">            import asyncio</span>
</span><span id="L-68"><a href="#L-68"><span class="linenos"> 68</span></a><span class="sd">            from memphis import Memphis</span>
</span><span id="L-69"><a href="#L-69"><span class="linenos"> 69</span></a>
</span><span id="L-70"><a href="#L-70"><span class="linenos"> 70</span></a><span class="sd">            async def message_handler(messages, error, context):</span>
</span><span id="L-71"><a href="#L-71"><span class="linenos"> 71</span></a><span class="sd">                if error:</span>
</span><span id="L-72"><a href="#L-72"><span class="linenos"> 72</span></a><span class="sd">                    print(f&quot;Error occurred: {error}&quot;)</span>
</span><span id="L-73"><a href="#L-73"><span class="linenos"> 73</span></a><span class="sd">                    return</span>
</span><span id="L-74"><a href="#L-74"><span class="linenos"> 74</span></a>
</span><span id="L-75"><a href="#L-75"><span class="linenos"> 75</span></a><span class="sd">                for message in messages:</span>
</span><span id="L-76"><a href="#L-76"><span class="linenos"> 76</span></a><span class="sd">                    print(f&quot;Received message: {message}&quot;)</span>
</span><span id="L-77"><a href="#L-77"><span class="linenos"> 77</span></a>
</span><span id="L-78"><a href="#L-78"><span class="linenos"> 78</span></a><span class="sd">            async def main():</span>
</span><span id="L-79"><a href="#L-79"><span class="linenos"> 79</span></a><span class="sd">                memphis = Memphis()</span>
</span><span id="L-80"><a href="#L-80"><span class="linenos"> 80</span></a><span class="sd">                await memphis.connect(host=&#39;localhost&#39;, username=&#39;user&#39;, password=&#39;pass&#39;)</span>
</span><span id="L-81"><a href="#L-81"><span class="linenos"> 81</span></a><span class="sd">                consumer = await memphis.consumer(station_name=&#39;my_station&#39;, consumer_name=&#39;my_consumer&#39;, consumer_group=&#39;my_group&#39;)</span>
</span><span id="L-82"><a href="#L-82"><span class="linenos"> 82</span></a><span class="sd">                consumer.set_context({&#39;key&#39;: &#39;value&#39;})</span>
</span><span id="L-83"><a href="#L-83"><span class="linenos"> 83</span></a><span class="sd">                consumer.consume(message_handler)</span>
</span><span id="L-84"><a href="#L-84"><span class="linenos"> 84</span></a>
</span><span id="L-85"><a href="#L-85"><span class="linenos"> 85</span></a><span class="sd">                # Keep the event loop running</span>
</span><span id="L-86"><a href="#L-86"><span class="linenos"> 86</span></a><span class="sd">                while True:</span>
</span><span id="L-87"><a href="#L-87"><span class="linenos"> 87</span></a><span class="sd">                    await asyncio.sleep(1)</span>
</span><span id="L-88"><a href="#L-88"><span class="linenos"> 88</span></a><span class="sd">            asyncio.run(main())</span>
</span><span id="L-89"><a href="#L-89"><span class="linenos"> 89</span></a><span class="sd">        &quot;&quot;&quot;</span>
</span><span id="L-90"><a href="#L-90"><span class="linenos"> 90</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">dls_callback_func</span> <span class="o">=</span> <span class="n">callback</span>
</span><span id="L-91"><a href="#L-91"><span class="linenos"> 91</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">t_consume</span> <span class="o">=</span> <span class="n">asyncio</span><span class="o">.</span><span class="n">create_task</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">__consume</span><span class="p">(</span><span class="n">callback</span><span class="p">))</span>
</span><span id="L-92"><a href="#L-92"><span class="linenos"> 92</span></a>
</span><span id="L-93"><a href="#L-93"><span class="linenos"> 93</span></a>    <span class="k">async</span> <span class="k">def</span> <span class="nf">__consume</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">callback</span><span class="p">):</span>
</span><span id="L-94"><a href="#L-94"><span class="linenos"> 94</span></a>        <span class="n">subject</span> <span class="o">=</span> <span class="n">get_internal_name</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">station_name</span><span class="p">)</span>
</span><span id="L-95"><a href="#L-95"><span class="linenos"> 95</span></a>        <span class="n">consumer_group</span> <span class="o">=</span> <span class="n">get_internal_name</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">consumer_group</span><span class="p">)</span>
</span><span id="L-96"><a href="#L-96"><span class="linenos"> 96</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">psub</span> <span class="o">=</span> <span class="k">await</span> <span class="bp">self</span><span class="o">.</span><span class="n">connection</span><span class="o">.</span><span class="n">broker_connection</span><span class="o">.</span><span class="n">pull_subscribe</span><span class="p">(</span>
</span><span id="L-97"><a href="#L-97"><span class="linenos"> 97</span></a>            <span class="n">subject</span> <span class="o">+</span> <span class="s2">&quot;.final&quot;</span><span class="p">,</span> <span class="n">durable</span><span class="o">=</span><span class="n">consumer_group</span>
</span><span id="L-98"><a href="#L-98"><span class="linenos"> 98</span></a>        <span class="p">)</span>
</span><span id="L-99"><a href="#L-99"><span class="linenos"> 99</span></a>        <span class="k">while</span> <span class="kc">True</span><span class="p">:</span>
</span><span id="L-100"><a href="#L-100"><span class="linenos">100</span></a>            <span class="k">if</span> <span class="bp">self</span><span class="o">.</span><span class="n">connection</span><span class="o">.</span><span class="n">is_connection_active</span> <span class="ow">and</span> <span class="bp">self</span><span class="o">.</span><span class="n">pull_interval_ms</span><span class="p">:</span>
</span><span id="L-101"><a href="#L-101"><span class="linenos">101</span></a>                <span class="k">try</span><span class="p">:</span>
</span><span id="L-102"><a href="#L-102"><span class="linenos">102</span></a>                    <span class="n">memphis_messages</span> <span class="o">=</span> <span class="p">[]</span>
</span><span id="L-103"><a href="#L-103"><span class="linenos">103</span></a>                    <span class="n">msgs</span> <span class="o">=</span> <span class="k">await</span> <span class="bp">self</span><span class="o">.</span><span class="n">psub</span><span class="o">.</span><span class="n">fetch</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">batch_size</span><span class="p">)</span>
</span><span id="L-104"><a href="#L-104"><span class="linenos">104</span></a>                    <span class="k">for</span> <span class="n">msg</span> <span class="ow">in</span> <span class="n">msgs</span><span class="p">:</span>
</span><span id="L-105"><a href="#L-105"><span class="linenos">105</span></a>                        <span class="n">memphis_messages</span><span class="o">.</span><span class="n">append</span><span class="p">(</span>
</span><span id="L-106"><a href="#L-106"><span class="linenos">106</span></a>                            <span class="n">Message</span><span class="p">(</span><span class="n">msg</span><span class="p">,</span> <span class="bp">self</span><span class="o">.</span><span class="n">connection</span><span class="p">,</span> <span class="bp">self</span><span class="o">.</span><span class="n">consumer_group</span><span class="p">)</span>
</span><span id="L-107"><a href="#L-107"><span class="linenos">107</span></a>                        <span class="p">)</span>
</span><span id="L-108"><a href="#L-108"><span class="linenos">108</span></a>                    <span class="k">await</span> <span class="n">callback</span><span class="p">(</span><span class="n">memphis_messages</span><span class="p">,</span> <span class="kc">None</span><span class="p">,</span> <span class="bp">self</span><span class="o">.</span><span class="n">context</span><span class="p">)</span>
</span><span id="L-109"><a href="#L-109"><span class="linenos">109</span></a>                    <span class="k">await</span> <span class="n">asyncio</span><span class="o">.</span><span class="n">sleep</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">pull_interval_ms</span> <span class="o">/</span> <span class="mi">1000</span><span class="p">)</span>
</span><span id="L-110"><a href="#L-110"><span class="linenos">110</span></a>
</span><span id="L-111"><a href="#L-111"><span class="linenos">111</span></a>                <span class="k">except</span> <span class="n">asyncio</span><span class="o">.</span><span class="n">TimeoutError</span><span class="p">:</span>
</span><span id="L-112"><a href="#L-112"><span class="linenos">112</span></a>                    <span class="k">await</span> <span class="n">callback</span><span class="p">(</span>
</span><span id="L-113"><a href="#L-113"><span class="linenos">113</span></a>                        <span class="p">[],</span> <span class="n">MemphisError</span><span class="p">(</span><span class="s2">&quot;Memphis: TimeoutError&quot;</span><span class="p">),</span> <span class="bp">self</span><span class="o">.</span><span class="n">context</span>
</span><span id="L-114"><a href="#L-114"><span class="linenos">114</span></a>                    <span class="p">)</span>
</span><span id="L-115"><a href="#L-115"><span class="linenos">115</span></a>                    <span class="k">continue</span>
</span><span id="L-116"><a href="#L-116"><span class="linenos">116</span></a>                <span class="k">except</span> <span class="ne">Exception</span> <span class="k">as</span> <span class="n">e</span><span class="p">:</span>
</span><span id="L-117"><a href="#L-117"><span class="linenos">117</span></a>                    <span class="k">if</span> <span class="bp">self</span><span class="o">.</span><span class="n">connection</span><span class="o">.</span><span class="n">is_connection_active</span><span class="p">:</span>
</span><span id="L-118"><a href="#L-118"><span class="linenos">118</span></a>                        <span class="k">raise</span> <span class="n">MemphisError</span><span class="p">(</span><span class="nb">str</span><span class="p">(</span><span class="n">e</span><span class="p">))</span> <span class="kn">from</span> <span class="nn">e</span>
</span><span id="L-119"><a href="#L-119"><span class="linenos">119</span></a>                    <span class="k">return</span>
</span><span id="L-120"><a href="#L-120"><span class="linenos">120</span></a>            <span class="k">else</span><span class="p">:</span>
</span><span id="L-121"><a href="#L-121"><span class="linenos">121</span></a>                <span class="k">break</span>
</span><span id="L-122"><a href="#L-122"><span class="linenos">122</span></a>
</span><span id="L-123"><a href="#L-123"><span class="linenos">123</span></a>    <span class="k">async</span> <span class="k">def</span> <span class="nf">__consume_dls</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
</span><span id="L-124"><a href="#L-124"><span class="linenos">124</span></a>        <span class="n">subject</span> <span class="o">=</span> <span class="n">get_internal_name</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">station_name</span><span class="p">)</span>
</span><span id="L-125"><a href="#L-125"><span class="linenos">125</span></a>        <span class="n">consumer_group</span> <span class="o">=</span> <span class="n">get_internal_name</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">consumer_group</span><span class="p">)</span>
</span><span id="L-126"><a href="#L-126"><span class="linenos">126</span></a>        <span class="k">try</span><span class="p">:</span>
</span><span id="L-127"><a href="#L-127"><span class="linenos">127</span></a>            <span class="n">subscription_name</span> <span class="o">=</span> <span class="s2">&quot;$memphis_dls_&quot;</span> <span class="o">+</span> <span class="n">subject</span> <span class="o">+</span> <span class="s2">&quot;_&quot;</span> <span class="o">+</span> <span class="n">consumer_group</span>
</span><span id="L-128"><a href="#L-128"><span class="linenos">128</span></a>            <span class="bp">self</span><span class="o">.</span><span class="n">consumer_dls</span> <span class="o">=</span> <span class="k">await</span> <span class="bp">self</span><span class="o">.</span><span class="n">connection</span><span class="o">.</span><span class="n">broker_manager</span><span class="o">.</span><span class="n">subscribe</span><span class="p">(</span>
</span><span id="L-129"><a href="#L-129"><span class="linenos">129</span></a>                <span class="n">subscription_name</span><span class="p">,</span> <span class="n">subscription_name</span>
</span><span id="L-130"><a href="#L-130"><span class="linenos">130</span></a>            <span class="p">)</span>
</span><span id="L-131"><a href="#L-131"><span class="linenos">131</span></a>            <span class="k">async</span> <span class="k">for</span> <span class="n">msg</span> <span class="ow">in</span> <span class="bp">self</span><span class="o">.</span><span class="n">consumer_dls</span><span class="o">.</span><span class="n">messages</span><span class="p">:</span>
</span><span id="L-132"><a href="#L-132"><span class="linenos">132</span></a>                <span class="n">index_to_insert</span> <span class="o">=</span> <span class="bp">self</span><span class="o">.</span><span class="n">dls_current_index</span>
</span><span id="L-133"><a href="#L-133"><span class="linenos">133</span></a>                <span class="k">if</span> <span class="n">index_to_insert</span> <span class="o">&gt;=</span> <span class="mi">10000</span><span class="p">:</span>
</span><span id="L-134"><a href="#L-134"><span class="linenos">134</span></a>                    <span class="n">index_to_insert</span> <span class="o">%=</span> <span class="mi">10000</span>
</span><span id="L-135"><a href="#L-135"><span class="linenos">135</span></a>                <span class="bp">self</span><span class="o">.</span><span class="n">dls_messages</span><span class="o">.</span><span class="n">insert</span><span class="p">(</span>
</span><span id="L-136"><a href="#L-136"><span class="linenos">136</span></a>                    <span class="n">index_to_insert</span><span class="p">,</span> <span class="n">Message</span><span class="p">(</span>
</span><span id="L-137"><a href="#L-137"><span class="linenos">137</span></a>                        <span class="n">msg</span><span class="p">,</span> <span class="bp">self</span><span class="o">.</span><span class="n">connection</span><span class="p">,</span> <span class="bp">self</span><span class="o">.</span><span class="n">consumer_group</span><span class="p">)</span>
</span><span id="L-138"><a href="#L-138"><span class="linenos">138</span></a>                <span class="p">)</span>
</span><span id="L-139"><a href="#L-139"><span class="linenos">139</span></a>                <span class="bp">self</span><span class="o">.</span><span class="n">dls_current_index</span> <span class="o">+=</span> <span class="mi">1</span>
</span><span id="L-140"><a href="#L-140"><span class="linenos">140</span></a>                <span class="k">if</span> <span class="bp">self</span><span class="o">.</span><span class="n">dls_callback_func</span> <span class="o">!=</span> <span class="kc">None</span><span class="p">:</span>
</span><span id="L-141"><a href="#L-141"><span class="linenos">141</span></a>                    <span class="k">await</span> <span class="bp">self</span><span class="o">.</span><span class="n">dls_callback_func</span><span class="p">(</span>
</span><span id="L-142"><a href="#L-142"><span class="linenos">142</span></a>                        <span class="p">[</span><span class="n">Message</span><span class="p">(</span><span class="n">msg</span><span class="p">,</span> <span class="bp">self</span><span class="o">.</span><span class="n">connection</span><span class="p">,</span> <span class="bp">self</span><span class="o">.</span><span class="n">consumer_group</span><span class="p">)],</span>
</span><span id="L-143"><a href="#L-143"><span class="linenos">143</span></a>                        <span class="kc">None</span><span class="p">,</span>
</span><span id="L-144"><a href="#L-144"><span class="linenos">144</span></a>                        <span class="bp">self</span><span class="o">.</span><span class="n">context</span><span class="p">,</span>
</span><span id="L-145"><a href="#L-145"><span class="linenos">145</span></a>                    <span class="p">)</span>
</span><span id="L-146"><a href="#L-146"><span class="linenos">146</span></a>        <span class="k">except</span> <span class="ne">Exception</span> <span class="k">as</span> <span class="n">e</span><span class="p">:</span>
</span><span id="L-147"><a href="#L-147"><span class="linenos">147</span></a>            <span class="k">if</span> <span class="bp">self</span><span class="o">.</span><span class="n">dls_callback_func</span> <span class="o">!=</span> <span class="kc">None</span><span class="p">:</span>
</span><span id="L-148"><a href="#L-148"><span class="linenos">148</span></a>                <span class="k">await</span> <span class="bp">self</span><span class="o">.</span><span class="n">dls_callback_func</span><span class="p">([],</span> <span class="n">MemphisError</span><span class="p">(</span><span class="nb">str</span><span class="p">(</span><span class="n">e</span><span class="p">)),</span> <span class="bp">self</span><span class="o">.</span><span class="n">context</span><span class="p">)</span>
</span><span id="L-149"><a href="#L-149"><span class="linenos">149</span></a>                <span class="k">return</span>
</span><span id="L-150"><a href="#L-150"><span class="linenos">150</span></a>
</span><span id="L-151"><a href="#L-151"><span class="linenos">151</span></a>    <span class="k">async</span> <span class="k">def</span> <span class="nf">fetch</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">batch_size</span><span class="p">:</span> <span class="nb">int</span> <span class="o">=</span> <span class="mi">10</span><span class="p">):</span>
</span><span id="L-152"><a href="#L-152"><span class="linenos">152</span></a><span class="w">        </span><span class="sd">&quot;&quot;&quot;</span>
</span><span id="L-153"><a href="#L-153"><span class="linenos">153</span></a><span class="sd">        Fetch a batch of messages.</span>
</span><span id="L-154"><a href="#L-154"><span class="linenos">154</span></a>
</span><span id="L-155"><a href="#L-155"><span class="linenos">155</span></a><span class="sd">        Returns a list of Message objects. If the connection is</span>
</span><span id="L-156"><a href="#L-156"><span class="linenos">156</span></a><span class="sd">        not active or no messages are recieved before timing out,</span>
</span><span id="L-157"><a href="#L-157"><span class="linenos">157</span></a><span class="sd">        an empty list is returned.</span>
</span><span id="L-158"><a href="#L-158"><span class="linenos">158</span></a>
</span><span id="L-159"><a href="#L-159"><span class="linenos">159</span></a><span class="sd">        Example:</span>
</span><span id="L-160"><a href="#L-160"><span class="linenos">160</span></a>
</span><span id="L-161"><a href="#L-161"><span class="linenos">161</span></a><span class="sd">            import asyncio</span>
</span><span id="L-162"><a href="#L-162"><span class="linenos">162</span></a><span class="sd">            </span>
</span><span id="L-163"><a href="#L-163"><span class="linenos">163</span></a><span class="sd">            from memphis import Memphis</span>
</span><span id="L-164"><a href="#L-164"><span class="linenos">164</span></a>
</span><span id="L-165"><a href="#L-165"><span class="linenos">165</span></a><span class="sd">            async def main(host, username, password, station):</span>
</span><span id="L-166"><a href="#L-166"><span class="linenos">166</span></a><span class="sd">                memphis = Memphis()</span>
</span><span id="L-167"><a href="#L-167"><span class="linenos">167</span></a><span class="sd">                await memphis.connect(host=host,</span>
</span><span id="L-168"><a href="#L-168"><span class="linenos">168</span></a><span class="sd">                                      username=username,</span>
</span><span id="L-169"><a href="#L-169"><span class="linenos">169</span></a><span class="sd">                                      password=password)</span>
</span><span id="L-170"><a href="#L-170"><span class="linenos">170</span></a><span class="sd">            </span>
</span><span id="L-171"><a href="#L-171"><span class="linenos">171</span></a><span class="sd">                consumer = await memphis.consumer(station_name=station,</span>
</span><span id="L-172"><a href="#L-172"><span class="linenos">172</span></a><span class="sd">                                                  consumer_name=&quot;test-consumer&quot;,</span>
</span><span id="L-173"><a href="#L-173"><span class="linenos">173</span></a><span class="sd">                                                  consumer_group=&quot;test-consumer-group&quot;)</span>
</span><span id="L-174"><a href="#L-174"><span class="linenos">174</span></a><span class="sd">            </span>
</span><span id="L-175"><a href="#L-175"><span class="linenos">175</span></a><span class="sd">                while True:</span>
</span><span id="L-176"><a href="#L-176"><span class="linenos">176</span></a><span class="sd">                    batch = await consumer.fetch()</span>
</span><span id="L-177"><a href="#L-177"><span class="linenos">177</span></a><span class="sd">                    print(&quot;Recieved {} messages&quot;.format(len(batch)))</span>
</span><span id="L-178"><a href="#L-178"><span class="linenos">178</span></a><span class="sd">                    for msg in batch:</span>
</span><span id="L-179"><a href="#L-179"><span class="linenos">179</span></a><span class="sd">                        serialized_record = msg.get_data()</span>
</span><span id="L-180"><a href="#L-180"><span class="linenos">180</span></a><span class="sd">                        print(&quot;Message:&quot;, serialized_record)</span>
</span><span id="L-181"><a href="#L-181"><span class="linenos">181</span></a><span class="sd">            </span>
</span><span id="L-182"><a href="#L-182"><span class="linenos">182</span></a><span class="sd">                await memphis.close()</span>
</span><span id="L-183"><a href="#L-183"><span class="linenos">183</span></a>
</span><span id="L-184"><a href="#L-184"><span class="linenos">184</span></a><span class="sd">            if __name__ == &#39;__main__&#39;:</span>
</span><span id="L-185"><a href="#L-185"><span class="linenos">185</span></a><span class="sd">                asyncio.run(main(host,</span>
</span><span id="L-186"><a href="#L-186"><span class="linenos">186</span></a><span class="sd">                                 username,</span>
</span><span id="L-187"><a href="#L-187"><span class="linenos">187</span></a><span class="sd">                                 password,</span>
</span><span id="L-188"><a href="#L-188"><span class="linenos">188</span></a><span class="sd">                                 station))</span>
</span><span id="L-189"><a href="#L-189"><span class="linenos">189</span></a><span class="sd">        </span>
</span><span id="L-190"><a href="#L-190"><span class="linenos">190</span></a><span class="sd">        &quot;&quot;&quot;</span>
</span><span id="L-191"><a href="#L-191"><span class="linenos">191</span></a>        <span class="n">messages</span> <span class="o">=</span> <span class="p">[]</span>
</span><span id="L-192"><a href="#L-192"><span class="linenos">192</span></a>        <span class="k">if</span> <span class="bp">self</span><span class="o">.</span><span class="n">connection</span><span class="o">.</span><span class="n">is_connection_active</span><span class="p">:</span>
</span><span id="L-193"><a href="#L-193"><span class="linenos">193</span></a>            <span class="k">try</span><span class="p">:</span>
</span><span id="L-194"><a href="#L-194"><span class="linenos">194</span></a>                <span class="k">if</span> <span class="n">batch_size</span> <span class="o">&gt;</span> <span class="bp">self</span><span class="o">.</span><span class="n">MAX_BATCH_SIZE</span><span class="p">:</span>
</span><span id="L-195"><a href="#L-195"><span class="linenos">195</span></a>                    <span class="k">raise</span> <span class="n">MemphisError</span><span class="p">(</span>
</span><span id="L-196"><a href="#L-196"><span class="linenos">196</span></a>                        <span class="sa">f</span><span class="s2">&quot;Batch size can not be greater than </span><span class="si">{</span><span class="bp">self</span><span class="o">.</span><span class="n">MAX_BATCH_SIZE</span><span class="si">}</span><span class="s2">&quot;</span><span class="p">)</span>
</span><span id="L-197"><a href="#L-197"><span class="linenos">197</span></a>                <span class="bp">self</span><span class="o">.</span><span class="n">batch_size</span> <span class="o">=</span> <span class="n">batch_size</span>
</span><span id="L-198"><a href="#L-198"><span class="linenos">198</span></a>                <span class="k">if</span> <span class="nb">len</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">dls_messages</span><span class="p">)</span> <span class="o">&gt;</span> <span class="mi">0</span><span class="p">:</span>
</span><span id="L-199"><a href="#L-199"><span class="linenos">199</span></a>                    <span class="k">if</span> <span class="nb">len</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">dls_messages</span><span class="p">)</span> <span class="o">&lt;=</span> <span class="n">batch_size</span><span class="p">:</span>
</span><span id="L-200"><a href="#L-200"><span class="linenos">200</span></a>                        <span class="n">messages</span> <span class="o">=</span> <span class="bp">self</span><span class="o">.</span><span class="n">dls_messages</span>
</span><span id="L-201"><a href="#L-201"><span class="linenos">201</span></a>                        <span class="bp">self</span><span class="o">.</span><span class="n">dls_messages</span> <span class="o">=</span> <span class="p">[]</span>
</span><span id="L-202"><a href="#L-202"><span class="linenos">202</span></a>                        <span class="bp">self</span><span class="o">.</span><span class="n">dls_current_index</span> <span class="o">=</span> <span class="mi">0</span>
</span><span id="L-203"><a href="#L-203"><span class="linenos">203</span></a>                    <span class="k">else</span><span class="p">:</span>
</span><span id="L-204"><a href="#L-204"><span class="linenos">204</span></a>                        <span class="n">messages</span> <span class="o">=</span> <span class="bp">self</span><span class="o">.</span><span class="n">dls_messages</span><span class="p">[</span><span class="mi">0</span><span class="p">:</span><span class="n">batch_size</span><span class="p">]</span>
</span><span id="L-205"><a href="#L-205"><span class="linenos">205</span></a>                        <span class="k">del</span> <span class="bp">self</span><span class="o">.</span><span class="n">dls_messages</span><span class="p">[</span><span class="mi">0</span><span class="p">:</span><span class="n">batch_size</span><span class="p">]</span>
</span><span id="L-206"><a href="#L-206"><span class="linenos">206</span></a>                        <span class="bp">self</span><span class="o">.</span><span class="n">dls_current_index</span> <span class="o">-=</span> <span class="nb">len</span><span class="p">(</span><span class="n">messages</span><span class="p">)</span>
</span><span id="L-207"><a href="#L-207"><span class="linenos">207</span></a>                    <span class="k">return</span> <span class="n">messages</span>
</span><span id="L-208"><a href="#L-208"><span class="linenos">208</span></a>
</span><span id="L-209"><a href="#L-209"><span class="linenos">209</span></a>                <span class="n">durable_name</span> <span class="o">=</span> <span class="s2">&quot;&quot;</span>
</span><span id="L-210"><a href="#L-210"><span class="linenos">210</span></a>                <span class="k">if</span> <span class="bp">self</span><span class="o">.</span><span class="n">consumer_group</span> <span class="o">!=</span> <span class="s2">&quot;&quot;</span><span class="p">:</span>
</span><span id="L-211"><a href="#L-211"><span class="linenos">211</span></a>                    <span class="n">durable_name</span> <span class="o">=</span> <span class="n">get_internal_name</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">consumer_group</span><span class="p">)</span>
</span><span id="L-212"><a href="#L-212"><span class="linenos">212</span></a>                <span class="k">else</span><span class="p">:</span>
</span><span id="L-213"><a href="#L-213"><span class="linenos">213</span></a>                    <span class="n">durable_name</span> <span class="o">=</span> <span class="n">get_internal_name</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">consumer_name</span><span class="p">)</span>
</span><span id="L-214"><a href="#L-214"><span class="linenos">214</span></a>                <span class="n">subject</span> <span class="o">=</span> <span class="n">get_internal_name</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">station_name</span><span class="p">)</span>
</span><span id="L-215"><a href="#L-215"><span class="linenos">215</span></a>                <span class="bp">self</span><span class="o">.</span><span class="n">psub</span> <span class="o">=</span> <span class="k">await</span> <span class="bp">self</span><span class="o">.</span><span class="n">connection</span><span class="o">.</span><span class="n">broker_connection</span><span class="o">.</span><span class="n">pull_subscribe</span><span class="p">(</span>
</span><span id="L-216"><a href="#L-216"><span class="linenos">216</span></a>                    <span class="n">subject</span> <span class="o">+</span> <span class="s2">&quot;.final&quot;</span><span class="p">,</span> <span class="n">durable</span><span class="o">=</span><span class="n">durable_name</span>
</span><span id="L-217"><a href="#L-217"><span class="linenos">217</span></a>                <span class="p">)</span>
</span><span id="L-218"><a href="#L-218"><span class="linenos">218</span></a>                <span class="n">msgs</span> <span class="o">=</span> <span class="k">await</span> <span class="bp">self</span><span class="o">.</span><span class="n">psub</span><span class="o">.</span><span class="n">fetch</span><span class="p">(</span><span class="n">batch_size</span><span class="p">)</span>
</span><span id="L-219"><a href="#L-219"><span class="linenos">219</span></a>                <span class="k">for</span> <span class="n">msg</span> <span class="ow">in</span> <span class="n">msgs</span><span class="p">:</span>
</span><span id="L-220"><a href="#L-220"><span class="linenos">220</span></a>                    <span class="n">messages</span><span class="o">.</span><span class="n">append</span><span class="p">(</span>
</span><span id="L-221"><a href="#L-221"><span class="linenos">221</span></a>                        <span class="n">Message</span><span class="p">(</span><span class="n">msg</span><span class="p">,</span> <span class="bp">self</span><span class="o">.</span><span class="n">connection</span><span class="p">,</span> <span class="bp">self</span><span class="o">.</span><span class="n">consumer_group</span><span class="p">))</span>
</span><span id="L-222"><a href="#L-222"><span class="linenos">222</span></a>                <span class="k">return</span> <span class="n">messages</span>
</span><span id="L-223"><a href="#L-223"><span class="linenos">223</span></a>            <span class="k">except</span> <span class="ne">Exception</span> <span class="k">as</span> <span class="n">e</span><span class="p">:</span>
</span><span id="L-224"><a href="#L-224"><span class="linenos">224</span></a>                <span class="k">if</span> <span class="s2">&quot;timeout&quot;</span> <span class="ow">not</span> <span class="ow">in</span> <span class="nb">str</span><span class="p">(</span><span class="n">e</span><span class="p">)</span><span class="o">.</span><span class="n">lower</span><span class="p">():</span>
</span><span id="L-225"><a href="#L-225"><span class="linenos">225</span></a>                    <span class="k">raise</span> <span class="n">MemphisError</span><span class="p">(</span><span class="nb">str</span><span class="p">(</span><span class="n">e</span><span class="p">))</span> <span class="kn">from</span> <span class="nn">e</span>
</span><span id="L-226"><a href="#L-226"><span class="linenos">226</span></a>
</span><span id="L-227"><a href="#L-227"><span class="linenos">227</span></a>        <span class="k">return</span> <span class="n">messages</span>
</span><span id="L-228"><a href="#L-228"><span class="linenos">228</span></a>
</span><span id="L-229"><a href="#L-229"><span class="linenos">229</span></a>    <span class="k">async</span> <span class="k">def</span> <span class="nf">__ping_consumer</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">callback</span><span class="p">):</span>
</span><span id="L-230"><a href="#L-230"><span class="linenos">230</span></a>        <span class="k">while</span> <span class="kc">True</span><span class="p">:</span>
</span><span id="L-231"><a href="#L-231"><span class="linenos">231</span></a>            <span class="k">try</span><span class="p">:</span>
</span><span id="L-232"><a href="#L-232"><span class="linenos">232</span></a>                <span class="k">await</span> <span class="n">asyncio</span><span class="o">.</span><span class="n">sleep</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">ping_consumer_interval_ms</span> <span class="o">/</span> <span class="mi">1000</span><span class="p">)</span>
</span><span id="L-233"><a href="#L-233"><span class="linenos">233</span></a>                <span class="n">consumer_group</span> <span class="o">=</span> <span class="n">get_internal_name</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">consumer_group</span><span class="p">)</span>
</span><span id="L-234"><a href="#L-234"><span class="linenos">234</span></a>                <span class="k">await</span> <span class="bp">self</span><span class="o">.</span><span class="n">connection</span><span class="o">.</span><span class="n">broker_connection</span><span class="o">.</span><span class="n">consumer_info</span><span class="p">(</span>
</span><span id="L-235"><a href="#L-235"><span class="linenos">235</span></a>                    <span class="bp">self</span><span class="o">.</span><span class="n">station_name</span><span class="p">,</span> <span class="n">consumer_group</span><span class="p">,</span> <span class="n">timeout</span><span class="o">=</span><span class="mi">30</span>
</span><span id="L-236"><a href="#L-236"><span class="linenos">236</span></a>                <span class="p">)</span>
</span><span id="L-237"><a href="#L-237"><span class="linenos">237</span></a>
</span><span id="L-238"><a href="#L-238"><span class="linenos">238</span></a>            <span class="k">except</span> <span class="ne">Exception</span> <span class="k">as</span> <span class="n">e</span><span class="p">:</span>
</span><span id="L-239"><a href="#L-239"><span class="linenos">239</span></a>                <span class="n">callback</span><span class="p">(</span><span class="n">MemphisError</span><span class="p">(</span><span class="nb">str</span><span class="p">(</span><span class="n">e</span><span class="p">)))</span>
</span><span id="L-240"><a href="#L-240"><span class="linenos">240</span></a>
</span><span id="L-241"><a href="#L-241"><span class="linenos">241</span></a>    <span class="k">async</span> <span class="k">def</span> <span class="nf">destroy</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
</span><span id="L-242"><a href="#L-242"><span class="linenos">242</span></a><span class="w">        </span><span class="sd">&quot;&quot;&quot;Destroy the consumer.&quot;&quot;&quot;</span>
</span><span id="L-243"><a href="#L-243"><span class="linenos">243</span></a>        <span class="k">if</span> <span class="bp">self</span><span class="o">.</span><span class="n">t_consume</span> <span class="ow">is</span> <span class="ow">not</span> <span class="kc">None</span><span class="p">:</span>
</span><span id="L-244"><a href="#L-244"><span class="linenos">244</span></a>            <span class="bp">self</span><span class="o">.</span><span class="n">t_consume</span><span class="o">.</span><span class="n">cancel</span><span class="p">()</span>
</span><span id="L-245"><a href="#L-245"><span class="linenos">245</span></a>        <span class="k">if</span> <span class="bp">self</span><span class="o">.</span><span class="n">t_dls</span> <span class="ow">is</span> <span class="ow">not</span> <span class="kc">None</span><span class="p">:</span>
</span><span id="L-246"><a href="#L-246"><span class="linenos">246</span></a>            <span class="bp">self</span><span class="o">.</span><span class="n">t_dls</span><span class="o">.</span><span class="n">cancel</span><span class="p">()</span>
</span><span id="L-247"><a href="#L-247"><span class="linenos">247</span></a>        <span class="k">if</span> <span class="bp">self</span><span class="o">.</span><span class="n">t_ping</span> <span class="ow">is</span> <span class="ow">not</span> <span class="kc">None</span><span class="p">:</span>
</span><span id="L-248"><a href="#L-248"><span class="linenos">248</span></a>            <span class="bp">self</span><span class="o">.</span><span class="n">t_ping</span><span class="o">.</span><span class="n">cancel</span><span class="p">()</span>
</span><span id="L-249"><a href="#L-249"><span class="linenos">249</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">pull_interval_ms</span> <span class="o">=</span> <span class="kc">None</span>
</span><span id="L-250"><a href="#L-250"><span class="linenos">250</span></a>        <span class="k">try</span><span class="p">:</span>
</span><span id="L-251"><a href="#L-251"><span class="linenos">251</span></a>            <span class="n">destroy_consumer_req</span> <span class="o">=</span> <span class="p">{</span>
</span><span id="L-252"><a href="#L-252"><span class="linenos">252</span></a>                <span class="s2">&quot;name&quot;</span><span class="p">:</span> <span class="bp">self</span><span class="o">.</span><span class="n">consumer_name</span><span class="p">,</span>
</span><span id="L-253"><a href="#L-253"><span class="linenos">253</span></a>                <span class="s2">&quot;station_name&quot;</span><span class="p">:</span> <span class="bp">self</span><span class="o">.</span><span class="n">station_name</span><span class="p">,</span>
</span><span id="L-254"><a href="#L-254"><span class="linenos">254</span></a>                <span class="s2">&quot;username&quot;</span><span class="p">:</span> <span class="bp">self</span><span class="o">.</span><span class="n">connection</span><span class="o">.</span><span class="n">username</span><span class="p">,</span>
</span><span id="L-255"><a href="#L-255"><span class="linenos">255</span></a>                <span class="s2">&quot;connection_id&quot;</span><span class="p">:</span> <span class="bp">self</span><span class="o">.</span><span class="n">connection</span><span class="o">.</span><span class="n">connection_id</span><span class="p">,</span>
</span><span id="L-256"><a href="#L-256"><span class="linenos">256</span></a>                <span class="s2">&quot;req_version&quot;</span><span class="p">:</span> <span class="mi">1</span><span class="p">,</span>
</span><span id="L-257"><a href="#L-257"><span class="linenos">257</span></a>            <span class="p">}</span>
</span><span id="L-258"><a href="#L-258"><span class="linenos">258</span></a>            <span class="n">consumer_name</span> <span class="o">=</span> <span class="n">json</span><span class="o">.</span><span class="n">dumps</span><span class="p">(</span>
</span><span id="L-259"><a href="#L-259"><span class="linenos">259</span></a>                <span class="n">destroy_consumer_req</span><span class="p">,</span> <span class="n">indent</span><span class="o">=</span><span class="mi">2</span><span class="p">)</span><span class="o">.</span><span class="n">encode</span><span class="p">(</span><span class="s2">&quot;utf-8&quot;</span><span class="p">)</span>
</span><span id="L-260"><a href="#L-260"><span class="linenos">260</span></a>            <span class="n">res</span> <span class="o">=</span> <span class="k">await</span> <span class="bp">self</span><span class="o">.</span><span class="n">connection</span><span class="o">.</span><span class="n">broker_manager</span><span class="o">.</span><span class="n">request</span><span class="p">(</span>
</span><span id="L-261"><a href="#L-261"><span class="linenos">261</span></a>                <span class="s2">&quot;$memphis_consumer_destructions&quot;</span><span class="p">,</span> <span class="n">consumer_name</span><span class="p">,</span> <span class="n">timeout</span><span class="o">=</span><span class="mi">5</span>
</span><span id="L-262"><a href="#L-262"><span class="linenos">262</span></a>            <span class="p">)</span>
</span><span id="L-263"><a href="#L-263"><span class="linenos">263</span></a>            <span class="n">error</span> <span class="o">=</span> <span class="n">res</span><span class="o">.</span><span class="n">data</span><span class="o">.</span><span class="n">decode</span><span class="p">(</span><span class="s2">&quot;utf-8&quot;</span><span class="p">)</span>
</span><span id="L-264"><a href="#L-264"><span class="linenos">264</span></a>            <span class="k">if</span> <span class="n">error</span> <span class="o">!=</span> <span class="s2">&quot;&quot;</span> <span class="ow">and</span> <span class="ow">not</span> <span class="s2">&quot;not exist&quot;</span> <span class="ow">in</span> <span class="n">error</span><span class="p">:</span>
</span><span id="L-265"><a href="#L-265"><span class="linenos">265</span></a>                <span class="k">raise</span> <span class="n">MemphisError</span><span class="p">(</span><span class="n">error</span><span class="p">)</span>
</span><span id="L-266"><a href="#L-266"><span class="linenos">266</span></a>            <span class="bp">self</span><span class="o">.</span><span class="n">dls_messages</span><span class="o">.</span><span class="n">clear</span><span class="p">()</span>
</span><span id="L-267"><a href="#L-267"><span class="linenos">267</span></a>            <span class="n">internal_station_name</span> <span class="o">=</span> <span class="n">get_internal_name</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">station_name</span><span class="p">)</span>
</span><span id="L-268"><a href="#L-268"><span class="linenos">268</span></a>            <span class="n">map_key</span> <span class="o">=</span> <span class="n">internal_station_name</span> <span class="o">+</span> <span class="s2">&quot;_&quot;</span> <span class="o">+</span> <span class="bp">self</span><span class="o">.</span><span class="n">consumer_name</span><span class="o">.</span><span class="n">lower</span><span class="p">()</span>
</span><span id="L-269"><a href="#L-269"><span class="linenos">269</span></a>            <span class="k">del</span> <span class="bp">self</span><span class="o">.</span><span class="n">connection</span><span class="o">.</span><span class="n">consumers_map</span><span class="p">[</span><span class="n">map_key</span><span class="p">]</span>
</span><span id="L-270"><a href="#L-270"><span class="linenos">270</span></a>        <span class="k">except</span> <span class="ne">Exception</span> <span class="k">as</span> <span class="n">e</span><span class="p">:</span>
</span><span id="L-271"><a href="#L-271"><span class="linenos">271</span></a>            <span class="k">raise</span> <span class="n">MemphisError</span><span class="p">(</span><span class="nb">str</span><span class="p">(</span><span class="n">e</span><span class="p">))</span> <span class="kn">from</span> <span class="nn">e</span>
</span></pre></div>


</section>
<section id="Consumer">
<input id="Consumer-view-source" class="view-source-toggle-state" type="checkbox" aria-hidden="true" tabindex="-1">
<div class="attr class">

<span class="def">class</span>
<span class="name">Consumer</span>:

<label class="view-source-button" for="Consumer-view-source"><span>View Source</span></label>

</div>
<a class="headerlink" href="#Consumer"></a>
<div class="pdoc-code codehilite"><pre><span></span><span id="Consumer-12"><a href="#Consumer-12"><span class="linenos"> 12</span></a><span class="k">class</span> <span class="nc">Consumer</span><span class="p">:</span>
</span><span id="Consumer-13"><a href="#Consumer-13"><span class="linenos"> 13</span></a>    <span class="n">MAX_BATCH_SIZE</span> <span class="o">=</span> <span class="mi">5000</span>
</span><span id="Consumer-14"><a href="#Consumer-14"><span class="linenos"> 14</span></a>
</span><span id="Consumer-15"><a href="#Consumer-15"><span class="linenos"> 15</span></a>    <span class="k">def</span> <span class="fm">__init__</span><span class="p">(</span>
</span><span id="Consumer-16"><a href="#Consumer-16"><span class="linenos"> 16</span></a>        <span class="bp">self</span><span class="p">,</span>
</span><span id="Consumer-17"><a href="#Consumer-17"><span class="linenos"> 17</span></a>        <span class="n">connection</span><span class="p">,</span>
</span><span id="Consumer-18"><a href="#Consumer-18"><span class="linenos"> 18</span></a>        <span class="n">station_name</span><span class="p">:</span> <span class="nb">str</span><span class="p">,</span>
</span><span id="Consumer-19"><a href="#Consumer-19"><span class="linenos"> 19</span></a>        <span class="n">consumer_name</span><span class="p">,</span>
</span><span id="Consumer-20"><a href="#Consumer-20"><span class="linenos"> 20</span></a>        <span class="n">consumer_group</span><span class="p">,</span>
</span><span id="Consumer-21"><a href="#Consumer-21"><span class="linenos"> 21</span></a>        <span class="n">pull_interval_ms</span><span class="p">:</span> <span class="nb">int</span><span class="p">,</span>
</span><span id="Consumer-22"><a href="#Consumer-22"><span class="linenos"> 22</span></a>        <span class="n">batch_size</span><span class="p">:</span> <span class="nb">int</span><span class="p">,</span>
</span><span id="Consumer-23"><a href="#Consumer-23"><span class="linenos"> 23</span></a>        <span class="n">batch_max_time_to_wait_ms</span><span class="p">:</span> <span class="nb">int</span><span class="p">,</span>
</span><span id="Consumer-24"><a href="#Consumer-24"><span class="linenos"> 24</span></a>        <span class="n">max_ack_time_ms</span><span class="p">:</span> <span class="nb">int</span><span class="p">,</span>
</span><span id="Consumer-25"><a href="#Consumer-25"><span class="linenos"> 25</span></a>        <span class="n">max_msg_deliveries</span><span class="p">:</span> <span class="nb">int</span> <span class="o">=</span> <span class="mi">10</span><span class="p">,</span>
</span><span id="Consumer-26"><a href="#Consumer-26"><span class="linenos"> 26</span></a>        <span class="n">error_callback</span><span class="o">=</span><span class="kc">None</span><span class="p">,</span>
</span><span id="Consumer-27"><a href="#Consumer-27"><span class="linenos"> 27</span></a>        <span class="n">start_consume_from_sequence</span><span class="p">:</span> <span class="nb">int</span> <span class="o">=</span> <span class="mi">1</span><span class="p">,</span>
</span><span id="Consumer-28"><a href="#Consumer-28"><span class="linenos"> 28</span></a>        <span class="n">last_messages</span><span class="p">:</span> <span class="nb">int</span> <span class="o">=</span> <span class="o">-</span><span class="mi">1</span><span class="p">,</span>
</span><span id="Consumer-29"><a href="#Consumer-29"><span class="linenos"> 29</span></a>    <span class="p">):</span>
</span><span id="Consumer-30"><a href="#Consumer-30"><span class="linenos"> 30</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">connection</span> <span class="o">=</span> <span class="n">connection</span>
</span><span id="Consumer-31"><a href="#Consumer-31"><span class="linenos"> 31</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">station_name</span> <span class="o">=</span> <span class="n">station_name</span><span class="o">.</span><span class="n">lower</span><span class="p">()</span>
</span><span id="Consumer-32"><a href="#Consumer-32"><span class="linenos"> 32</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">consumer_name</span> <span class="o">=</span> <span class="n">consumer_name</span><span class="o">.</span><span class="n">lower</span><span class="p">()</span>
</span><span id="Consumer-33"><a href="#Consumer-33"><span class="linenos"> 33</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">consumer_group</span> <span class="o">=</span> <span class="n">consumer_group</span><span class="o">.</span><span class="n">lower</span><span class="p">()</span>
</span><span id="Consumer-34"><a href="#Consumer-34"><span class="linenos"> 34</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">pull_interval_ms</span> <span class="o">=</span> <span class="n">pull_interval_ms</span>
</span><span id="Consumer-35"><a href="#Consumer-35"><span class="linenos"> 35</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">batch_size</span> <span class="o">=</span> <span class="n">batch_size</span>
</span><span id="Consumer-36"><a href="#Consumer-36"><span class="linenos"> 36</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">batch_max_time_to_wait_ms</span> <span class="o">=</span> <span class="n">batch_max_time_to_wait_ms</span>
</span><span id="Consumer-37"><a href="#Consumer-37"><span class="linenos"> 37</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">max_ack_time_ms</span> <span class="o">=</span> <span class="n">max_ack_time_ms</span>
</span><span id="Consumer-38"><a href="#Consumer-38"><span class="linenos"> 38</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">max_msg_deliveries</span> <span class="o">=</span> <span class="n">max_msg_deliveries</span>
</span><span id="Consumer-39"><a href="#Consumer-39"><span class="linenos"> 39</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">ping_consumer_interval_ms</span> <span class="o">=</span> <span class="mi">30000</span>
</span><span id="Consumer-40"><a href="#Consumer-40"><span class="linenos"> 40</span></a>        <span class="k">if</span> <span class="n">error_callback</span> <span class="ow">is</span> <span class="kc">None</span><span class="p">:</span>
</span><span id="Consumer-41"><a href="#Consumer-41"><span class="linenos"> 41</span></a>            <span class="n">error_callback</span> <span class="o">=</span> <span class="n">default_error_handler</span>
</span><span id="Consumer-42"><a href="#Consumer-42"><span class="linenos"> 42</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">t_ping</span> <span class="o">=</span> <span class="n">asyncio</span><span class="o">.</span><span class="n">create_task</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">__ping_consumer</span><span class="p">(</span><span class="n">error_callback</span><span class="p">))</span>
</span><span id="Consumer-43"><a href="#Consumer-43"><span class="linenos"> 43</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">start_consume_from_sequence</span> <span class="o">=</span> <span class="n">start_consume_from_sequence</span>
</span><span id="Consumer-44"><a href="#Consumer-44"><span class="linenos"> 44</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">last_messages</span> <span class="o">=</span> <span class="n">last_messages</span>
</span><span id="Consumer-45"><a href="#Consumer-45"><span class="linenos"> 45</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">context</span> <span class="o">=</span> <span class="p">{}</span>
</span><span id="Consumer-46"><a href="#Consumer-46"><span class="linenos"> 46</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">dls_messages</span> <span class="o">=</span> <span class="p">[]</span>
</span><span id="Consumer-47"><a href="#Consumer-47"><span class="linenos"> 47</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">dls_current_index</span> <span class="o">=</span> <span class="mi">0</span>
</span><span id="Consumer-48"><a href="#Consumer-48"><span class="linenos"> 48</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">dls_callback_func</span> <span class="o">=</span> <span class="kc">None</span>
</span><span id="Consumer-49"><a href="#Consumer-49"><span class="linenos"> 49</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">t_dls</span> <span class="o">=</span> <span class="n">asyncio</span><span class="o">.</span><span class="n">create_task</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">__consume_dls</span><span class="p">())</span>
</span><span id="Consumer-50"><a href="#Consumer-50"><span class="linenos"> 50</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">t_consume</span> <span class="o">=</span> <span class="kc">None</span>
</span><span id="Consumer-51"><a href="#Consumer-51"><span class="linenos"> 51</span></a>
</span><span id="Consumer-52"><a href="#Consumer-52"><span class="linenos"> 52</span></a>    <span class="k">def</span> <span class="nf">set_context</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">context</span><span class="p">):</span>
</span><span id="Consumer-53"><a href="#Consumer-53"><span class="linenos"> 53</span></a><span class="w">        </span><span class="sd">&quot;&quot;&quot;Set a context (dict) that will be passed to each message handler call.&quot;&quot;&quot;</span>
</span><span id="Consumer-54"><a href="#Consumer-54"><span class="linenos"> 54</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">context</span> <span class="o">=</span> <span class="n">context</span>
</span><span id="Consumer-55"><a href="#Consumer-55"><span class="linenos"> 55</span></a>
</span><span id="Consumer-56"><a href="#Consumer-56"><span class="linenos"> 56</span></a>    <span class="k">def</span> <span class="nf">consume</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">callback</span><span class="p">):</span>
</span><span id="Consumer-57"><a href="#Consumer-57"><span class="linenos"> 57</span></a><span class="w">        </span><span class="sd">&quot;&quot;&quot;</span>
</span><span id="Consumer-58"><a href="#Consumer-58"><span class="linenos"> 58</span></a><span class="sd">        This method starts consuming events from the specified station and invokes the provided callback function for each batch of messages received.</span>
</span><span id="Consumer-59"><a href="#Consumer-59"><span class="linenos"> 59</span></a>
</span><span id="Consumer-60"><a href="#Consumer-60"><span class="linenos"> 60</span></a><span class="sd">        Parameters:</span>
</span><span id="Consumer-61"><a href="#Consumer-61"><span class="linenos"> 61</span></a><span class="sd">            callback (function): A function that will be called with each batch of messages received. The function should have the following signature:</span>
</span><span id="Consumer-62"><a href="#Consumer-62"><span class="linenos"> 62</span></a><span class="sd">                - `callback(messages: List[Message], error: Optional[MemphisError], context: Dict) -&gt; Awaitable[None]`</span>
</span><span id="Consumer-63"><a href="#Consumer-63"><span class="linenos"> 63</span></a><span class="sd">                - `messages`: A list of `Message` objects representing the batch of messages received.</span>
</span><span id="Consumer-64"><a href="#Consumer-64"><span class="linenos"> 64</span></a><span class="sd">                - `error`: An optional `MemphisError` object if there was an error while consuming the messages.</span>
</span><span id="Consumer-65"><a href="#Consumer-65"><span class="linenos"> 65</span></a><span class="sd">                - `context`: A dictionary representing the context that was set using the `set_context()` method.</span>
</span><span id="Consumer-66"><a href="#Consumer-66"><span class="linenos"> 66</span></a>
</span><span id="Consumer-67"><a href="#Consumer-67"><span class="linenos"> 67</span></a><span class="sd">        Example:</span>
</span><span id="Consumer-68"><a href="#Consumer-68"><span class="linenos"> 68</span></a><span class="sd">            import asyncio</span>
</span><span id="Consumer-69"><a href="#Consumer-69"><span class="linenos"> 69</span></a><span class="sd">            from memphis import Memphis</span>
</span><span id="Consumer-70"><a href="#Consumer-70"><span class="linenos"> 70</span></a>
</span><span id="Consumer-71"><a href="#Consumer-71"><span class="linenos"> 71</span></a><span class="sd">            async def message_handler(messages, error, context):</span>
</span><span id="Consumer-72"><a href="#Consumer-72"><span class="linenos"> 72</span></a><span class="sd">                if error:</span>
</span><span id="Consumer-73"><a href="#Consumer-73"><span class="linenos"> 73</span></a><span class="sd">                    print(f&quot;Error occurred: {error}&quot;)</span>
</span><span id="Consumer-74"><a href="#Consumer-74"><span class="linenos"> 74</span></a><span class="sd">                    return</span>
</span><span id="Consumer-75"><a href="#Consumer-75"><span class="linenos"> 75</span></a>
</span><span id="Consumer-76"><a href="#Consumer-76"><span class="linenos"> 76</span></a><span class="sd">                for message in messages:</span>
</span><span id="Consumer-77"><a href="#Consumer-77"><span class="linenos"> 77</span></a><span class="sd">                    print(f&quot;Received message: {message}&quot;)</span>
</span><span id="Consumer-78"><a href="#Consumer-78"><span class="linenos"> 78</span></a>
</span><span id="Consumer-79"><a href="#Consumer-79"><span class="linenos"> 79</span></a><span class="sd">            async def main():</span>
</span><span id="Consumer-80"><a href="#Consumer-80"><span class="linenos"> 80</span></a><span class="sd">                memphis = Memphis()</span>
</span><span id="Consumer-81"><a href="#Consumer-81"><span class="linenos"> 81</span></a><span class="sd">                await memphis.connect(host=&#39;localhost&#39;, username=&#39;user&#39;, password=&#39;pass&#39;)</span>
</span><span id="Consumer-82"><a href="#Consumer-82"><span class="linenos"> 82</span></a><span class="sd">                consumer = await memphis.consumer(station_name=&#39;my_station&#39;, consumer_name=&#39;my_consumer&#39;, consumer_group=&#39;my_group&#39;)</span>
</span><span id="Consumer-83"><a href="#Consumer-83"><span class="linenos"> 83</span></a><span class="sd">                consumer.set_context({&#39;key&#39;: &#39;value&#39;})</span>
</span><span id="Consumer-84"><a href="#Consumer-84"><span class="linenos"> 84</span></a><span class="sd">                consumer.consume(message_handler)</span>
</span><span id="Consumer-85"><a href="#Consumer-85"><span class="linenos"> 85</span></a>
</span><span id="Consumer-86"><a href="#Consumer-86"><span class="linenos"> 86</span></a><span class="sd">                # Keep the event loop running</span>
</span><span id="Consumer-87"><a href="#Consumer-87"><span class="linenos"> 87</span></a><span class="sd">                while True:</span>
</span><span id="Consumer-88"><a href="#Consumer-88"><span class="linenos"> 88</span></a><span class="sd">                    await asyncio.sleep(1)</span>
</span><span id="Consumer-89"><a href="#Consumer-89"><span class="linenos"> 89</span></a><span class="sd">            asyncio.run(main())</span>
</span><span id="Consumer-90"><a href="#Consumer-90"><span class="linenos"> 90</span></a><span class="sd">        &quot;&quot;&quot;</span>
</span><span id="Consumer-91"><a href="#Consumer-91"><span class="linenos"> 91</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">dls_callback_func</span> <span class="o">=</span> <span class="n">callback</span>
</span><span id="Consumer-92"><a href="#Consumer-92"><span class="linenos"> 92</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">t_consume</span> <span class="o">=</span> <span class="n">asyncio</span><span class="o">.</span><span class="n">create_task</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">__consume</span><span class="p">(</span><span class="n">callback</span><span class="p">))</span>
</span><span id="Consumer-93"><a href="#Consumer-93"><span class="linenos"> 93</span></a>
</span><span id="Consumer-94"><a href="#Consumer-94"><span class="linenos"> 94</span></a>    <span class="k">async</span> <span class="k">def</span> <span class="nf">__consume</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">callback</span><span class="p">):</span>
</span><span id="Consumer-95"><a href="#Consumer-95"><span class="linenos"> 95</span></a>        <span class="n">subject</span> <span class="o">=</span> <span class="n">get_internal_name</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">station_name</span><span class="p">)</span>
</span><span id="Consumer-96"><a href="#Consumer-96"><span class="linenos"> 96</span></a>        <span class="n">consumer_group</span> <span class="o">=</span> <span class="n">get_internal_name</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">consumer_group</span><span class="p">)</span>
</span><span id="Consumer-97"><a href="#Consumer-97"><span class="linenos"> 97</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">psub</span> <span class="o">=</span> <span class="k">await</span> <span class="bp">self</span><span class="o">.</span><span class="n">connection</span><span class="o">.</span><span class="n">broker_connection</span><span class="o">.</span><span class="n">pull_subscribe</span><span class="p">(</span>
</span><span id="Consumer-98"><a href="#Consumer-98"><span class="linenos"> 98</span></a>            <span class="n">subject</span> <span class="o">+</span> <span class="s2">&quot;.final&quot;</span><span class="p">,</span> <span class="n">durable</span><span class="o">=</span><span class="n">consumer_group</span>
</span><span id="Consumer-99"><a href="#Consumer-99"><span class="linenos"> 99</span></a>        <span class="p">)</span>
</span><span id="Consumer-100"><a href="#Consumer-100"><span class="linenos">100</span></a>        <span class="k">while</span> <span class="kc">True</span><span class="p">:</span>
</span><span id="Consumer-101"><a href="#Consumer-101"><span class="linenos">101</span></a>            <span class="k">if</span> <span class="bp">self</span><span class="o">.</span><span class="n">connection</span><span class="o">.</span><span class="n">is_connection_active</span> <span class="ow">and</span> <span class="bp">self</span><span class="o">.</span><span class="n">pull_interval_ms</span><span class="p">:</span>
</span><span id="Consumer-102"><a href="#Consumer-102"><span class="linenos">102</span></a>                <span class="k">try</span><span class="p">:</span>
</span><span id="Consumer-103"><a href="#Consumer-103"><span class="linenos">103</span></a>                    <span class="n">memphis_messages</span> <span class="o">=</span> <span class="p">[]</span>
</span><span id="Consumer-104"><a href="#Consumer-104"><span class="linenos">104</span></a>                    <span class="n">msgs</span> <span class="o">=</span> <span class="k">await</span> <span class="bp">self</span><span class="o">.</span><span class="n">psub</span><span class="o">.</span><span class="n">fetch</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">batch_size</span><span class="p">)</span>
</span><span id="Consumer-105"><a href="#Consumer-105"><span class="linenos">105</span></a>                    <span class="k">for</span> <span class="n">msg</span> <span class="ow">in</span> <span class="n">msgs</span><span class="p">:</span>
</span><span id="Consumer-106"><a href="#Consumer-106"><span class="linenos">106</span></a>                        <span class="n">memphis_messages</span><span class="o">.</span><span class="n">append</span><span class="p">(</span>
</span><span id="Consumer-107"><a href="#Consumer-107"><span class="linenos">107</span></a>                            <span class="n">Message</span><span class="p">(</span><span class="n">msg</span><span class="p">,</span> <span class="bp">self</span><span class="o">.</span><span class="n">connection</span><span class="p">,</span> <span class="bp">self</span><span class="o">.</span><span class="n">consumer_group</span><span class="p">)</span>
</span><span id="Consumer-108"><a href="#Consumer-108"><span class="linenos">108</span></a>                        <span class="p">)</span>
</span><span id="Consumer-109"><a href="#Consumer-109"><span class="linenos">109</span></a>                    <span class="k">await</span> <span class="n">callback</span><span class="p">(</span><span class="n">memphis_messages</span><span class="p">,</span> <span class="kc">None</span><span class="p">,</span> <span class="bp">self</span><span class="o">.</span><span class="n">context</span><span class="p">)</span>
</span><span id="Consumer-110"><a href="#Consumer-110"><span class="linenos">110</span></a>                    <span class="k">await</span> <span class="n">asyncio</span><span class="o">.</span><span class="n">sleep</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">pull_interval_ms</span> <span class="o">/</span> <span class="mi">1000</span><span class="p">)</span>
</span><span id="Consumer-111"><a href="#Consumer-111"><span class="linenos">111</span></a>
</span><span id="Consumer-112"><a href="#Consumer-112"><span class="linenos">112</span></a>                <span class="k">except</span> <span class="n">asyncio</span><span class="o">.</span><span class="n">TimeoutError</span><span class="p">:</span>
</span><span id="Consumer-113"><a href="#Consumer-113"><span class="linenos">113</span></a>                    <span class="k">await</span> <span class="n">callback</span><span class="p">(</span>
</span><span id="Consumer-114"><a href="#Consumer-114"><span class="linenos">114</span></a>                        <span class="p">[],</span> <span class="n">MemphisError</span><span class="p">(</span><span class="s2">&quot;Memphis: TimeoutError&quot;</span><span class="p">),</span> <span class="bp">self</span><span class="o">.</span><span class="n">context</span>
</span><span id="Consumer-115"><a href="#Consumer-115"><span class="linenos">115</span></a>                    <span class="p">)</span>
</span><span id="Consumer-116"><a href="#Consumer-116"><span class="linenos">116</span></a>                    <span class="k">continue</span>
</span><span id="Consumer-117"><a href="#Consumer-117"><span class="linenos">117</span></a>                <span class="k">except</span> <span class="ne">Exception</span> <span class="k">as</span> <span class="n">e</span><span class="p">:</span>
</span><span id="Consumer-118"><a href="#Consumer-118"><span class="linenos">118</span></a>                    <span class="k">if</span> <span class="bp">self</span><span class="o">.</span><span class="n">connection</span><span class="o">.</span><span class="n">is_connection_active</span><span class="p">:</span>
</span><span id="Consumer-119"><a href="#Consumer-119"><span class="linenos">119</span></a>                        <span class="k">raise</span> <span class="n">MemphisError</span><span class="p">(</span><span class="nb">str</span><span class="p">(</span><span class="n">e</span><span class="p">))</span> <span class="kn">from</span> <span class="nn">e</span>
</span><span id="Consumer-120"><a href="#Consumer-120"><span class="linenos">120</span></a>                    <span class="k">return</span>
</span><span id="Consumer-121"><a href="#Consumer-121"><span class="linenos">121</span></a>            <span class="k">else</span><span class="p">:</span>
</span><span id="Consumer-122"><a href="#Consumer-122"><span class="linenos">122</span></a>                <span class="k">break</span>
</span><span id="Consumer-123"><a href="#Consumer-123"><span class="linenos">123</span></a>
</span><span id="Consumer-124"><a href="#Consumer-124"><span class="linenos">124</span></a>    <span class="k">async</span> <span class="k">def</span> <span class="nf">__consume_dls</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
</span><span id="Consumer-125"><a href="#Consumer-125"><span class="linenos">125</span></a>        <span class="n">subject</span> <span class="o">=</span> <span class="n">get_internal_name</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">station_name</span><span class="p">)</span>
</span><span id="Consumer-126"><a href="#Consumer-126"><span class="linenos">126</span></a>        <span class="n">consumer_group</span> <span class="o">=</span> <span class="n">get_internal_name</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">consumer_group</span><span class="p">)</span>
</span><span id="Consumer-127"><a href="#Consumer-127"><span class="linenos">127</span></a>        <span class="k">try</span><span class="p">:</span>
</span><span id="Consumer-128"><a href="#Consumer-128"><span class="linenos">128</span></a>            <span class="n">subscription_name</span> <span class="o">=</span> <span class="s2">&quot;$memphis_dls_&quot;</span> <span class="o">+</span> <span class="n">subject</span> <span class="o">+</span> <span class="s2">&quot;_&quot;</span> <span class="o">+</span> <span class="n">consumer_group</span>
</span><span id="Consumer-129"><a href="#Consumer-129"><span class="linenos">129</span></a>            <span class="bp">self</span><span class="o">.</span><span class="n">consumer_dls</span> <span class="o">=</span> <span class="k">await</span> <span class="bp">self</span><span class="o">.</span><span class="n">connection</span><span class="o">.</span><span class="n">broker_manager</span><span class="o">.</span><span class="n">subscribe</span><span class="p">(</span>
</span><span id="Consumer-130"><a href="#Consumer-130"><span class="linenos">130</span></a>                <span class="n">subscription_name</span><span class="p">,</span> <span class="n">subscription_name</span>
</span><span id="Consumer-131"><a href="#Consumer-131"><span class="linenos">131</span></a>            <span class="p">)</span>
</span><span id="Consumer-132"><a href="#Consumer-132"><span class="linenos">132</span></a>            <span class="k">async</span> <span class="k">for</span> <span class="n">msg</span> <span class="ow">in</span> <span class="bp">self</span><span class="o">.</span><span class="n">consumer_dls</span><span class="o">.</span><span class="n">messages</span><span class="p">:</span>
</span><span id="Consumer-133"><a href="#Consumer-133"><span class="linenos">133</span></a>                <span class="n">index_to_insert</span> <span class="o">=</span> <span class="bp">self</span><span class="o">.</span><span class="n">dls_current_index</span>
</span><span id="Consumer-134"><a href="#Consumer-134"><span class="linenos">134</span></a>                <span class="k">if</span> <span class="n">index_to_insert</span> <span class="o">&gt;=</span> <span class="mi">10000</span><span class="p">:</span>
</span><span id="Consumer-135"><a href="#Consumer-135"><span class="linenos">135</span></a>                    <span class="n">index_to_insert</span> <span class="o">%=</span> <span class="mi">10000</span>
</span><span id="Consumer-136"><a href="#Consumer-136"><span class="linenos">136</span></a>                <span class="bp">self</span><span class="o">.</span><span class="n">dls_messages</span><span class="o">.</span><span class="n">insert</span><span class="p">(</span>
</span><span id="Consumer-137"><a href="#Consumer-137"><span class="linenos">137</span></a>                    <span class="n">index_to_insert</span><span class="p">,</span> <span class="n">Message</span><span class="p">(</span>
</span><span id="Consumer-138"><a href="#Consumer-138"><span class="linenos">138</span></a>                        <span class="n">msg</span><span class="p">,</span> <span class="bp">self</span><span class="o">.</span><span class="n">connection</span><span class="p">,</span> <span class="bp">self</span><span class="o">.</span><span class="n">consumer_group</span><span class="p">)</span>
</span><span id="Consumer-139"><a href="#Consumer-139"><span class="linenos">139</span></a>                <span class="p">)</span>
</span><span id="Consumer-140"><a href="#Consumer-140"><span class="linenos">140</span></a>                <span class="bp">self</span><span class="o">.</span><span class="n">dls_current_index</span> <span class="o">+=</span> <span class="mi">1</span>
</span><span id="Consumer-141"><a href="#Consumer-141"><span class="linenos">141</span></a>                <span class="k">if</span> <span class="bp">self</span><span class="o">.</span><span class="n">dls_callback_func</span> <span class="o">!=</span> <span class="kc">None</span><span class="p">:</span>
</span><span id="Consumer-142"><a href="#Consumer-142"><span class="linenos">142</span></a>                    <span class="k">await</span> <span class="bp">self</span><span class="o">.</span><span class="n">dls_callback_func</span><span class="p">(</span>
</span><span id="Consumer-143"><a href="#Consumer-143"><span class="linenos">143</span></a>                        <span class="p">[</span><span class="n">Message</span><span class="p">(</span><span class="n">msg</span><span class="p">,</span> <span class="bp">self</span><span class="o">.</span><span class="n">connection</span><span class="p">,</span> <span class="bp">self</span><span class="o">.</span><span class="n">consumer_group</span><span class="p">)],</span>
</span><span id="Consumer-144"><a href="#Consumer-144"><span class="linenos">144</span></a>                        <span class="kc">None</span><span class="p">,</span>
</span><span id="Consumer-145"><a href="#Consumer-145"><span class="linenos">145</span></a>                        <span class="bp">self</span><span class="o">.</span><span class="n">context</span><span class="p">,</span>
</span><span id="Consumer-146"><a href="#Consumer-146"><span class="linenos">146</span></a>                    <span class="p">)</span>
</span><span id="Consumer-147"><a href="#Consumer-147"><span class="linenos">147</span></a>        <span class="k">except</span> <span class="ne">Exception</span> <span class="k">as</span> <span class="n">e</span><span class="p">:</span>
</span><span id="Consumer-148"><a href="#Consumer-148"><span class="linenos">148</span></a>            <span class="k">if</span> <span class="bp">self</span><span class="o">.</span><span class="n">dls_callback_func</span> <span class="o">!=</span> <span class="kc">None</span><span class="p">:</span>
</span><span id="Consumer-149"><a href="#Consumer-149"><span class="linenos">149</span></a>                <span class="k">await</span> <span class="bp">self</span><span class="o">.</span><span class="n">dls_callback_func</span><span class="p">([],</span> <span class="n">MemphisError</span><span class="p">(</span><span class="nb">str</span><span class="p">(</span><span class="n">e</span><span class="p">)),</span> <span class="bp">self</span><span class="o">.</span><span class="n">context</span><span class="p">)</span>
</span><span id="Consumer-150"><a href="#Consumer-150"><span class="linenos">150</span></a>                <span class="k">return</span>
</span><span id="Consumer-151"><a href="#Consumer-151"><span class="linenos">151</span></a>
</span><span id="Consumer-152"><a href="#Consumer-152"><span class="linenos">152</span></a>    <span class="k">async</span> <span class="k">def</span> <span class="nf">fetch</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">batch_size</span><span class="p">:</span> <span class="nb">int</span> <span class="o">=</span> <span class="mi">10</span><span class="p">):</span>
</span><span id="Consumer-153"><a href="#Consumer-153"><span class="linenos">153</span></a><span class="w">        </span><span class="sd">&quot;&quot;&quot;</span>
</span><span id="Consumer-154"><a href="#Consumer-154"><span class="linenos">154</span></a><span class="sd">        Fetch a batch of messages.</span>
</span><span id="Consumer-155"><a href="#Consumer-155"><span class="linenos">155</span></a>
</span><span id="Consumer-156"><a href="#Consumer-156"><span class="linenos">156</span></a><span class="sd">        Returns a list of Message objects. If the connection is</span>
</span><span id="Consumer-157"><a href="#Consumer-157"><span class="linenos">157</span></a><span class="sd">        not active or no messages are recieved before timing out,</span>
</span><span id="Consumer-158"><a href="#Consumer-158"><span class="linenos">158</span></a><span class="sd">        an empty list is returned.</span>
</span><span id="Consumer-159"><a href="#Consumer-159"><span class="linenos">159</span></a>
</span><span id="Consumer-160"><a href="#Consumer-160"><span class="linenos">160</span></a><span class="sd">        Example:</span>
</span><span id="Consumer-161"><a href="#Consumer-161"><span class="linenos">161</span></a>
</span><span id="Consumer-162"><a href="#Consumer-162"><span class="linenos">162</span></a><span class="sd">            import asyncio</span>
</span><span id="Consumer-163"><a href="#Consumer-163"><span class="linenos">163</span></a><span class="sd">            </span>
</span><span id="Consumer-164"><a href="#Consumer-164"><span class="linenos">164</span></a><span class="sd">            from memphis import Memphis</span>
</span><span id="Consumer-165"><a href="#Consumer-165"><span class="linenos">165</span></a>
</span><span id="Consumer-166"><a href="#Consumer-166"><span class="linenos">166</span></a><span class="sd">            async def main(host, username, password, station):</span>
</span><span id="Consumer-167"><a href="#Consumer-167"><span class="linenos">167</span></a><span class="sd">                memphis = Memphis()</span>
</span><span id="Consumer-168"><a href="#Consumer-168"><span class="linenos">168</span></a><span class="sd">                await memphis.connect(host=host,</span>
</span><span id="Consumer-169"><a href="#Consumer-169"><span class="linenos">169</span></a><span class="sd">                                      username=username,</span>
</span><span id="Consumer-170"><a href="#Consumer-170"><span class="linenos">170</span></a><span class="sd">                                      password=password)</span>
</span><span id="Consumer-171"><a href="#Consumer-171"><span class="linenos">171</span></a><span class="sd">            </span>
</span><span id="Consumer-172"><a href="#Consumer-172"><span class="linenos">172</span></a><span class="sd">                consumer = await memphis.consumer(station_name=station,</span>
</span><span id="Consumer-173"><a href="#Consumer-173"><span class="linenos">173</span></a><span class="sd">                                                  consumer_name=&quot;test-consumer&quot;,</span>
</span><span id="Consumer-174"><a href="#Consumer-174"><span class="linenos">174</span></a><span class="sd">                                                  consumer_group=&quot;test-consumer-group&quot;)</span>
</span><span id="Consumer-175"><a href="#Consumer-175"><span class="linenos">175</span></a><span class="sd">            </span>
</span><span id="Consumer-176"><a href="#Consumer-176"><span class="linenos">176</span></a><span class="sd">                while True:</span>
</span><span id="Consumer-177"><a href="#Consumer-177"><span class="linenos">177</span></a><span class="sd">                    batch = await consumer.fetch()</span>
</span><span id="Consumer-178"><a href="#Consumer-178"><span class="linenos">178</span></a><span class="sd">                    print(&quot;Recieved {} messages&quot;.format(len(batch)))</span>
</span><span id="Consumer-179"><a href="#Consumer-179"><span class="linenos">179</span></a><span class="sd">                    for msg in batch:</span>
</span><span id="Consumer-180"><a href="#Consumer-180"><span class="linenos">180</span></a><span class="sd">                        serialized_record = msg.get_data()</span>
</span><span id="Consumer-181"><a href="#Consumer-181"><span class="linenos">181</span></a><span class="sd">                        print(&quot;Message:&quot;, serialized_record)</span>
</span><span id="Consumer-182"><a href="#Consumer-182"><span class="linenos">182</span></a><span class="sd">            </span>
</span><span id="Consumer-183"><a href="#Consumer-183"><span class="linenos">183</span></a><span class="sd">                await memphis.close()</span>
</span><span id="Consumer-184"><a href="#Consumer-184"><span class="linenos">184</span></a>
</span><span id="Consumer-185"><a href="#Consumer-185"><span class="linenos">185</span></a><span class="sd">            if __name__ == &#39;__main__&#39;:</span>
</span><span id="Consumer-186"><a href="#Consumer-186"><span class="linenos">186</span></a><span class="sd">                asyncio.run(main(host,</span>
</span><span id="Consumer-187"><a href="#Consumer-187"><span class="linenos">187</span></a><span class="sd">                                 username,</span>
</span><span id="Consumer-188"><a href="#Consumer-188"><span class="linenos">188</span></a><span class="sd">                                 password,</span>
</span><span id="Consumer-189"><a href="#Consumer-189"><span class="linenos">189</span></a><span class="sd">                                 station))</span>
</span><span id="Consumer-190"><a href="#Consumer-190"><span class="linenos">190</span></a><span class="sd">        </span>
</span><span id="Consumer-191"><a href="#Consumer-191"><span class="linenos">191</span></a><span class="sd">        &quot;&quot;&quot;</span>
</span><span id="Consumer-192"><a href="#Consumer-192"><span class="linenos">192</span></a>        <span class="n">messages</span> <span class="o">=</span> <span class="p">[]</span>
</span><span id="Consumer-193"><a href="#Consumer-193"><span class="linenos">193</span></a>        <span class="k">if</span> <span class="bp">self</span><span class="o">.</span><span class="n">connection</span><span class="o">.</span><span class="n">is_connection_active</span><span class="p">:</span>
</span><span id="Consumer-194"><a href="#Consumer-194"><span class="linenos">194</span></a>            <span class="k">try</span><span class="p">:</span>
</span><span id="Consumer-195"><a href="#Consumer-195"><span class="linenos">195</span></a>                <span class="k">if</span> <span class="n">batch_size</span> <span class="o">&gt;</span> <span class="bp">self</span><span class="o">.</span><span class="n">MAX_BATCH_SIZE</span><span class="p">:</span>
</span><span id="Consumer-196"><a href="#Consumer-196"><span class="linenos">196</span></a>                    <span class="k">raise</span> <span class="n">MemphisError</span><span class="p">(</span>
</span><span id="Consumer-197"><a href="#Consumer-197"><span class="linenos">197</span></a>                        <span class="sa">f</span><span class="s2">&quot;Batch size can not be greater than </span><span class="si">{</span><span class="bp">self</span><span class="o">.</span><span class="n">MAX_BATCH_SIZE</span><span class="si">}</span><span class="s2">&quot;</span><span class="p">)</span>
</span><span id="Consumer-198"><a href="#Consumer-198"><span class="linenos">198</span></a>                <span class="bp">self</span><span class="o">.</span><span class="n">batch_size</span> <span class="o">=</span> <span class="n">batch_size</span>
</span><span id="Consumer-199"><a href="#Consumer-199"><span class="linenos">199</span></a>                <span class="k">if</span> <span class="nb">len</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">dls_messages</span><span class="p">)</span> <span class="o">&gt;</span> <span class="mi">0</span><span class="p">:</span>
</span><span id="Consumer-200"><a href="#Consumer-200"><span class="linenos">200</span></a>                    <span class="k">if</span> <span class="nb">len</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">dls_messages</span><span class="p">)</span> <span class="o">&lt;=</span> <span class="n">batch_size</span><span class="p">:</span>
</span><span id="Consumer-201"><a href="#Consumer-201"><span class="linenos">201</span></a>                        <span class="n">messages</span> <span class="o">=</span> <span class="bp">self</span><span class="o">.</span><span class="n">dls_messages</span>
</span><span id="Consumer-202"><a href="#Consumer-202"><span class="linenos">202</span></a>                        <span class="bp">self</span><span class="o">.</span><span class="n">dls_messages</span> <span class="o">=</span> <span class="p">[]</span>
</span><span id="Consumer-203"><a href="#Consumer-203"><span class="linenos">203</span></a>                        <span class="bp">self</span><span class="o">.</span><span class="n">dls_current_index</span> <span class="o">=</span> <span class="mi">0</span>
</span><span id="Consumer-204"><a href="#Consumer-204"><span class="linenos">204</span></a>                    <span class="k">else</span><span class="p">:</span>
</span><span id="Consumer-205"><a href="#Consumer-205"><span class="linenos">205</span></a>                        <span class="n">messages</span> <span class="o">=</span> <span class="bp">self</span><span class="o">.</span><span class="n">dls_messages</span><span class="p">[</span><span class="mi">0</span><span class="p">:</span><span class="n">batch_size</span><span class="p">]</span>
</span><span id="Consumer-206"><a href="#Consumer-206"><span class="linenos">206</span></a>                        <span class="k">del</span> <span class="bp">self</span><span class="o">.</span><span class="n">dls_messages</span><span class="p">[</span><span class="mi">0</span><span class="p">:</span><span class="n">batch_size</span><span class="p">]</span>
</span><span id="Consumer-207"><a href="#Consumer-207"><span class="linenos">207</span></a>                        <span class="bp">self</span><span class="o">.</span><span class="n">dls_current_index</span> <span class="o">-=</span> <span class="nb">len</span><span class="p">(</span><span class="n">messages</span><span class="p">)</span>
</span><span id="Consumer-208"><a href="#Consumer-208"><span class="linenos">208</span></a>                    <span class="k">return</span> <span class="n">messages</span>
</span><span id="Consumer-209"><a href="#Consumer-209"><span class="linenos">209</span></a>
</span><span id="Consumer-210"><a href="#Consumer-210"><span class="linenos">210</span></a>                <span class="n">durable_name</span> <span class="o">=</span> <span class="s2">&quot;&quot;</span>
</span><span id="Consumer-211"><a href="#Consumer-211"><span class="linenos">211</span></a>                <span class="k">if</span> <span class="bp">self</span><span class="o">.</span><span class="n">consumer_group</span> <span class="o">!=</span> <span class="s2">&quot;&quot;</span><span class="p">:</span>
</span><span id="Consumer-212"><a href="#Consumer-212"><span class="linenos">212</span></a>                    <span class="n">durable_name</span> <span class="o">=</span> <span class="n">get_internal_name</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">consumer_group</span><span class="p">)</span>
</span><span id="Consumer-213"><a href="#Consumer-213"><span class="linenos">213</span></a>                <span class="k">else</span><span class="p">:</span>
</span><span id="Consumer-214"><a href="#Consumer-214"><span class="linenos">214</span></a>                    <span class="n">durable_name</span> <span class="o">=</span> <span class="n">get_internal_name</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">consumer_name</span><span class="p">)</span>
</span><span id="Consumer-215"><a href="#Consumer-215"><span class="linenos">215</span></a>                <span class="n">subject</span> <span class="o">=</span> <span class="n">get_internal_name</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">station_name</span><span class="p">)</span>
</span><span id="Consumer-216"><a href="#Consumer-216"><span class="linenos">216</span></a>                <span class="bp">self</span><span class="o">.</span><span class="n">psub</span> <span class="o">=</span> <span class="k">await</span> <span class="bp">self</span><span class="o">.</span><span class="n">connection</span><span class="o">.</span><span class="n">broker_connection</span><span class="o">.</span><span class="n">pull_subscribe</span><span class="p">(</span>
</span><span id="Consumer-217"><a href="#Consumer-217"><span class="linenos">217</span></a>                    <span class="n">subject</span> <span class="o">+</span> <span class="s2">&quot;.final&quot;</span><span class="p">,</span> <span class="n">durable</span><span class="o">=</span><span class="n">durable_name</span>
</span><span id="Consumer-218"><a href="#Consumer-218"><span class="linenos">218</span></a>                <span class="p">)</span>
</span><span id="Consumer-219"><a href="#Consumer-219"><span class="linenos">219</span></a>                <span class="n">msgs</span> <span class="o">=</span> <span class="k">await</span> <span class="bp">self</span><span class="o">.</span><span class="n">psub</span><span class="o">.</span><span class="n">fetch</span><span class="p">(</span><span class="n">batch_size</span><span class="p">)</span>
</span><span id="Consumer-220"><a href="#Consumer-220"><span class="linenos">220</span></a>                <span class="k">for</span> <span class="n">msg</span> <span class="ow">in</span> <span class="n">msgs</span><span class="p">:</span>
</span><span id="Consumer-221"><a href="#Consumer-221"><span class="linenos">221</span></a>                    <span class="n">messages</span><span class="o">.</span><span class="n">append</span><span class="p">(</span>
</span><span id="Consumer-222"><a href="#Consumer-222"><span class="linenos">222</span></a>                        <span class="n">Message</span><span class="p">(</span><span class="n">msg</span><span class="p">,</span> <span class="bp">self</span><span class="o">.</span><span class="n">connection</span><span class="p">,</span> <span class="bp">self</span><span class="o">.</span><span class="n">consumer_group</span><span class="p">))</span>
</span><span id="Consumer-223"><a href="#Consumer-223"><span class="linenos">223</span></a>                <span class="k">return</span> <span class="n">messages</span>
</span><span id="Consumer-224"><a href="#Consumer-224"><span class="linenos">224</span></a>            <span class="k">except</span> <span class="ne">Exception</span> <span class="k">as</span> <span class="n">e</span><span class="p">:</span>
</span><span id="Consumer-225"><a href="#Consumer-225"><span class="linenos">225</span></a>                <span class="k">if</span> <span class="s2">&quot;timeout&quot;</span> <span class="ow">not</span> <span class="ow">in</span> <span class="nb">str</span><span class="p">(</span><span class="n">e</span><span class="p">)</span><span class="o">.</span><span class="n">lower</span><span class="p">():</span>
</span><span id="Consumer-226"><a href="#Consumer-226"><span class="linenos">226</span></a>                    <span class="k">raise</span> <span class="n">MemphisError</span><span class="p">(</span><span class="nb">str</span><span class="p">(</span><span class="n">e</span><span class="p">))</span> <span class="kn">from</span> <span class="nn">e</span>
</span><span id="Consumer-227"><a href="#Consumer-227"><span class="linenos">227</span></a>
</span><span id="Consumer-228"><a href="#Consumer-228"><span class="linenos">228</span></a>        <span class="k">return</span> <span class="n">messages</span>
</span><span id="Consumer-229"><a href="#Consumer-229"><span class="linenos">229</span></a>
</span><span id="Consumer-230"><a href="#Consumer-230"><span class="linenos">230</span></a>    <span class="k">async</span> <span class="k">def</span> <span class="nf">__ping_consumer</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">callback</span><span class="p">):</span>
</span><span id="Consumer-231"><a href="#Consumer-231"><span class="linenos">231</span></a>        <span class="k">while</span> <span class="kc">True</span><span class="p">:</span>
</span><span id="Consumer-232"><a href="#Consumer-232"><span class="linenos">232</span></a>            <span class="k">try</span><span class="p">:</span>
</span><span id="Consumer-233"><a href="#Consumer-233"><span class="linenos">233</span></a>                <span class="k">await</span> <span class="n">asyncio</span><span class="o">.</span><span class="n">sleep</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">ping_consumer_interval_ms</span> <span class="o">/</span> <span class="mi">1000</span><span class="p">)</span>
</span><span id="Consumer-234"><a href="#Consumer-234"><span class="linenos">234</span></a>                <span class="n">consumer_group</span> <span class="o">=</span> <span class="n">get_internal_name</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">consumer_group</span><span class="p">)</span>
</span><span id="Consumer-235"><a href="#Consumer-235"><span class="linenos">235</span></a>                <span class="k">await</span> <span class="bp">self</span><span class="o">.</span><span class="n">connection</span><span class="o">.</span><span class="n">broker_connection</span><span class="o">.</span><span class="n">consumer_info</span><span class="p">(</span>
</span><span id="Consumer-236"><a href="#Consumer-236"><span class="linenos">236</span></a>                    <span class="bp">self</span><span class="o">.</span><span class="n">station_name</span><span class="p">,</span> <span class="n">consumer_group</span><span class="p">,</span> <span class="n">timeout</span><span class="o">=</span><span class="mi">30</span>
</span><span id="Consumer-237"><a href="#Consumer-237"><span class="linenos">237</span></a>                <span class="p">)</span>
</span><span id="Consumer-238"><a href="#Consumer-238"><span class="linenos">238</span></a>
</span><span id="Consumer-239"><a href="#Consumer-239"><span class="linenos">239</span></a>            <span class="k">except</span> <span class="ne">Exception</span> <span class="k">as</span> <span class="n">e</span><span class="p">:</span>
</span><span id="Consumer-240"><a href="#Consumer-240"><span class="linenos">240</span></a>                <span class="n">callback</span><span class="p">(</span><span class="n">MemphisError</span><span class="p">(</span><span class="nb">str</span><span class="p">(</span><span class="n">e</span><span class="p">)))</span>
</span><span id="Consumer-241"><a href="#Consumer-241"><span class="linenos">241</span></a>
</span><span id="Consumer-242"><a href="#Consumer-242"><span class="linenos">242</span></a>    <span class="k">async</span> <span class="k">def</span> <span class="nf">destroy</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
</span><span id="Consumer-243"><a href="#Consumer-243"><span class="linenos">243</span></a><span class="w">        </span><span class="sd">&quot;&quot;&quot;Destroy the consumer.&quot;&quot;&quot;</span>
</span><span id="Consumer-244"><a href="#Consumer-244"><span class="linenos">244</span></a>        <span class="k">if</span> <span class="bp">self</span><span class="o">.</span><span class="n">t_consume</span> <span class="ow">is</span> <span class="ow">not</span> <span class="kc">None</span><span class="p">:</span>
</span><span id="Consumer-245"><a href="#Consumer-245"><span class="linenos">245</span></a>            <span class="bp">self</span><span class="o">.</span><span class="n">t_consume</span><span class="o">.</span><span class="n">cancel</span><span class="p">()</span>
</span><span id="Consumer-246"><a href="#Consumer-246"><span class="linenos">246</span></a>        <span class="k">if</span> <span class="bp">self</span><span class="o">.</span><span class="n">t_dls</span> <span class="ow">is</span> <span class="ow">not</span> <span class="kc">None</span><span class="p">:</span>
</span><span id="Consumer-247"><a href="#Consumer-247"><span class="linenos">247</span></a>            <span class="bp">self</span><span class="o">.</span><span class="n">t_dls</span><span class="o">.</span><span class="n">cancel</span><span class="p">()</span>
</span><span id="Consumer-248"><a href="#Consumer-248"><span class="linenos">248</span></a>        <span class="k">if</span> <span class="bp">self</span><span class="o">.</span><span class="n">t_ping</span> <span class="ow">is</span> <span class="ow">not</span> <span class="kc">None</span><span class="p">:</span>
</span><span id="Consumer-249"><a href="#Consumer-249"><span class="linenos">249</span></a>            <span class="bp">self</span><span class="o">.</span><span class="n">t_ping</span><span class="o">.</span><span class="n">cancel</span><span class="p">()</span>
</span><span id="Consumer-250"><a href="#Consumer-250"><span class="linenos">250</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">pull_interval_ms</span> <span class="o">=</span> <span class="kc">None</span>
</span><span id="Consumer-251"><a href="#Consumer-251"><span class="linenos">251</span></a>        <span class="k">try</span><span class="p">:</span>
</span><span id="Consumer-252"><a href="#Consumer-252"><span class="linenos">252</span></a>            <span class="n">destroy_consumer_req</span> <span class="o">=</span> <span class="p">{</span>
</span><span id="Consumer-253"><a href="#Consumer-253"><span class="linenos">253</span></a>                <span class="s2">&quot;name&quot;</span><span class="p">:</span> <span class="bp">self</span><span class="o">.</span><span class="n">consumer_name</span><span class="p">,</span>
</span><span id="Consumer-254"><a href="#Consumer-254"><span class="linenos">254</span></a>                <span class="s2">&quot;station_name&quot;</span><span class="p">:</span> <span class="bp">self</span><span class="o">.</span><span class="n">station_name</span><span class="p">,</span>
</span><span id="Consumer-255"><a href="#Consumer-255"><span class="linenos">255</span></a>                <span class="s2">&quot;username&quot;</span><span class="p">:</span> <span class="bp">self</span><span class="o">.</span><span class="n">connection</span><span class="o">.</span><span class="n">username</span><span class="p">,</span>
</span><span id="Consumer-256"><a href="#Consumer-256"><span class="linenos">256</span></a>                <span class="s2">&quot;connection_id&quot;</span><span class="p">:</span> <span class="bp">self</span><span class="o">.</span><span class="n">connection</span><span class="o">.</span><span class="n">connection_id</span><span class="p">,</span>
</span><span id="Consumer-257"><a href="#Consumer-257"><span class="linenos">257</span></a>                <span class="s2">&quot;req_version&quot;</span><span class="p">:</span> <span class="mi">1</span><span class="p">,</span>
</span><span id="Consumer-258"><a href="#Consumer-258"><span class="linenos">258</span></a>            <span class="p">}</span>
</span><span id="Consumer-259"><a href="#Consumer-259"><span class="linenos">259</span></a>            <span class="n">consumer_name</span> <span class="o">=</span> <span class="n">json</span><span class="o">.</span><span class="n">dumps</span><span class="p">(</span>
</span><span id="Consumer-260"><a href="#Consumer-260"><span class="linenos">260</span></a>                <span class="n">destroy_consumer_req</span><span class="p">,</span> <span class="n">indent</span><span class="o">=</span><span class="mi">2</span><span class="p">)</span><span class="o">.</span><span class="n">encode</span><span class="p">(</span><span class="s2">&quot;utf-8&quot;</span><span class="p">)</span>
</span><span id="Consumer-261"><a href="#Consumer-261"><span class="linenos">261</span></a>            <span class="n">res</span> <span class="o">=</span> <span class="k">await</span> <span class="bp">self</span><span class="o">.</span><span class="n">connection</span><span class="o">.</span><span class="n">broker_manager</span><span class="o">.</span><span class="n">request</span><span class="p">(</span>
</span><span id="Consumer-262"><a href="#Consumer-262"><span class="linenos">262</span></a>                <span class="s2">&quot;$memphis_consumer_destructions&quot;</span><span class="p">,</span> <span class="n">consumer_name</span><span class="p">,</span> <span class="n">timeout</span><span class="o">=</span><span class="mi">5</span>
</span><span id="Consumer-263"><a href="#Consumer-263"><span class="linenos">263</span></a>            <span class="p">)</span>
</span><span id="Consumer-264"><a href="#Consumer-264"><span class="linenos">264</span></a>            <span class="n">error</span> <span class="o">=</span> <span class="n">res</span><span class="o">.</span><span class="n">data</span><span class="o">.</span><span class="n">decode</span><span class="p">(</span><span class="s2">&quot;utf-8&quot;</span><span class="p">)</span>
</span><span id="Consumer-265"><a href="#Consumer-265"><span class="linenos">265</span></a>            <span class="k">if</span> <span class="n">error</span> <span class="o">!=</span> <span class="s2">&quot;&quot;</span> <span class="ow">and</span> <span class="ow">not</span> <span class="s2">&quot;not exist&quot;</span> <span class="ow">in</span> <span class="n">error</span><span class="p">:</span>
</span><span id="Consumer-266"><a href="#Consumer-266"><span class="linenos">266</span></a>                <span class="k">raise</span> <span class="n">MemphisError</span><span class="p">(</span><span class="n">error</span><span class="p">)</span>
</span><span id="Consumer-267"><a href="#Consumer-267"><span class="linenos">267</span></a>            <span class="bp">self</span><span class="o">.</span><span class="n">dls_messages</span><span class="o">.</span><span class="n">clear</span><span class="p">()</span>
</span><span id="Consumer-268"><a href="#Consumer-268"><span class="linenos">268</span></a>            <span class="n">internal_station_name</span> <span class="o">=</span> <span class="n">get_internal_name</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">station_name</span><span class="p">)</span>
</span><span id="Consumer-269"><a href="#Consumer-269"><span class="linenos">269</span></a>            <span class="n">map_key</span> <span class="o">=</span> <span class="n">internal_station_name</span> <span class="o">+</span> <span class="s2">&quot;_&quot;</span> <span class="o">+</span> <span class="bp">self</span><span class="o">.</span><span class="n">consumer_name</span><span class="o">.</span><span class="n">lower</span><span class="p">()</span>
</span><span id="Consumer-270"><a href="#Consumer-270"><span class="linenos">270</span></a>            <span class="k">del</span> <span class="bp">self</span><span class="o">.</span><span class="n">connection</span><span class="o">.</span><span class="n">consumers_map</span><span class="p">[</span><span class="n">map_key</span><span class="p">]</span>
</span><span id="Consumer-271"><a href="#Consumer-271"><span class="linenos">271</span></a>        <span class="k">except</span> <span class="ne">Exception</span> <span class="k">as</span> <span class="n">e</span><span class="p">:</span>
</span><span id="Consumer-272"><a href="#Consumer-272"><span class="linenos">272</span></a>            <span class="k">raise</span> <span class="n">MemphisError</span><span class="p">(</span><span class="nb">str</span><span class="p">(</span><span class="n">e</span><span class="p">))</span> <span class="kn">from</span> <span class="nn">e</span>
</span></pre></div>




<div id="Consumer.__init__" class="classattr">
<input id="Consumer.__init__-view-source" class="view-source-toggle-state" type="checkbox" aria-hidden="true" tabindex="-1">
<div class="attr function">

<span class="name">Consumer</span><span class="signature pdoc-code multiline">(<span class="param">	<span class="n">connection</span>,</span><span class="param">	<span class="n">station_name</span><span class="p">:</span> <span class="nb">str</span>,</span><span class="param">	<span class="n">consumer_name</span>,</span><span class="param">	<span class="n">consumer_group</span>,</span><span class="param">	<span class="n">pull_interval_ms</span><span class="p">:</span> <span class="nb">int</span>,</span><span class="param">	<span class="n">batch_size</span><span class="p">:</span> <span class="nb">int</span>,</span><span class="param">	<span class="n">batch_max_time_to_wait_ms</span><span class="p">:</span> <span class="nb">int</span>,</span><span class="param">	<span class="n">max_ack_time_ms</span><span class="p">:</span> <span class="nb">int</span>,</span><span class="param">	<span class="n">max_msg_deliveries</span><span class="p">:</span> <span class="nb">int</span> <span class="o">=</span> <span class="mi">10</span>,</span><span class="param">	<span class="n">error_callback</span><span class="o">=</span><span class="kc">None</span>,</span><span class="param">	<span class="n">start_consume_from_sequence</span><span class="p">:</span> <span class="nb">int</span> <span class="o">=</span> <span class="mi">1</span>,</span><span class="param">	<span class="n">last_messages</span><span class="p">:</span> <span class="nb">int</span> <span class="o">=</span> <span class="o">-</span><span class="mi">1</span></span>)</span>

<label class="view-source-button" for="Consumer.__init__-view-source"><span>View Source</span></label>

</div>
<a class="headerlink" href="#Consumer.__init__"></a>
<div class="pdoc-code codehilite"><pre><span></span><span id="Consumer.__init__-15"><a href="#Consumer.__init__-15"><span class="linenos">15</span></a>    <span class="k">def</span> <span class="fm">__init__</span><span class="p">(</span>
</span><span id="Consumer.__init__-16"><a href="#Consumer.__init__-16"><span class="linenos">16</span></a>        <span class="bp">self</span><span class="p">,</span>
</span><span id="Consumer.__init__-17"><a href="#Consumer.__init__-17"><span class="linenos">17</span></a>        <span class="n">connection</span><span class="p">,</span>
</span><span id="Consumer.__init__-18"><a href="#Consumer.__init__-18"><span class="linenos">18</span></a>        <span class="n">station_name</span><span class="p">:</span> <span class="nb">str</span><span class="p">,</span>
</span><span id="Consumer.__init__-19"><a href="#Consumer.__init__-19"><span class="linenos">19</span></a>        <span class="n">consumer_name</span><span class="p">,</span>
</span><span id="Consumer.__init__-20"><a href="#Consumer.__init__-20"><span class="linenos">20</span></a>        <span class="n">consumer_group</span><span class="p">,</span>
</span><span id="Consumer.__init__-21"><a href="#Consumer.__init__-21"><span class="linenos">21</span></a>        <span class="n">pull_interval_ms</span><span class="p">:</span> <span class="nb">int</span><span class="p">,</span>
</span><span id="Consumer.__init__-22"><a href="#Consumer.__init__-22"><span class="linenos">22</span></a>        <span class="n">batch_size</span><span class="p">:</span> <span class="nb">int</span><span class="p">,</span>
</span><span id="Consumer.__init__-23"><a href="#Consumer.__init__-23"><span class="linenos">23</span></a>        <span class="n">batch_max_time_to_wait_ms</span><span class="p">:</span> <span class="nb">int</span><span class="p">,</span>
</span><span id="Consumer.__init__-24"><a href="#Consumer.__init__-24"><span class="linenos">24</span></a>        <span class="n">max_ack_time_ms</span><span class="p">:</span> <span class="nb">int</span><span class="p">,</span>
</span><span id="Consumer.__init__-25"><a href="#Consumer.__init__-25"><span class="linenos">25</span></a>        <span class="n">max_msg_deliveries</span><span class="p">:</span> <span class="nb">int</span> <span class="o">=</span> <span class="mi">10</span><span class="p">,</span>
</span><span id="Consumer.__init__-26"><a href="#Consumer.__init__-26"><span class="linenos">26</span></a>        <span class="n">error_callback</span><span class="o">=</span><span class="kc">None</span><span class="p">,</span>
</span><span id="Consumer.__init__-27"><a href="#Consumer.__init__-27"><span class="linenos">27</span></a>        <span class="n">start_consume_from_sequence</span><span class="p">:</span> <span class="nb">int</span> <span class="o">=</span> <span class="mi">1</span><span class="p">,</span>
</span><span id="Consumer.__init__-28"><a href="#Consumer.__init__-28"><span class="linenos">28</span></a>        <span class="n">last_messages</span><span class="p">:</span> <span class="nb">int</span> <span class="o">=</span> <span class="o">-</span><span class="mi">1</span><span class="p">,</span>
</span><span id="Consumer.__init__-29"><a href="#Consumer.__init__-29"><span class="linenos">29</span></a>    <span class="p">):</span>
</span><span id="Consumer.__init__-30"><a href="#Consumer.__init__-30"><span class="linenos">30</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">connection</span> <span class="o">=</span> <span class="n">connection</span>
</span><span id="Consumer.__init__-31"><a href="#Consumer.__init__-31"><span class="linenos">31</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">station_name</span> <span class="o">=</span> <span class="n">station_name</span><span class="o">.</span><span class="n">lower</span><span class="p">()</span>
</span><span id="Consumer.__init__-32"><a href="#Consumer.__init__-32"><span class="linenos">32</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">consumer_name</span> <span class="o">=</span> <span class="n">consumer_name</span><span class="o">.</span><span class="n">lower</span><span class="p">()</span>
</span><span id="Consumer.__init__-33"><a href="#Consumer.__init__-33"><span class="linenos">33</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">consumer_group</span> <span class="o">=</span> <span class="n">consumer_group</span><span class="o">.</span><span class="n">lower</span><span class="p">()</span>
</span><span id="Consumer.__init__-34"><a href="#Consumer.__init__-34"><span class="linenos">34</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">pull_interval_ms</span> <span class="o">=</span> <span class="n">pull_interval_ms</span>
</span><span id="Consumer.__init__-35"><a href="#Consumer.__init__-35"><span class="linenos">35</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">batch_size</span> <span class="o">=</span> <span class="n">batch_size</span>
</span><span id="Consumer.__init__-36"><a href="#Consumer.__init__-36"><span class="linenos">36</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">batch_max_time_to_wait_ms</span> <span class="o">=</span> <span class="n">batch_max_time_to_wait_ms</span>
</span><span id="Consumer.__init__-37"><a href="#Consumer.__init__-37"><span class="linenos">37</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">max_ack_time_ms</span> <span class="o">=</span> <span class="n">max_ack_time_ms</span>
</span><span id="Consumer.__init__-38"><a href="#Consumer.__init__-38"><span class="linenos">38</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">max_msg_deliveries</span> <span class="o">=</span> <span class="n">max_msg_deliveries</span>
</span><span id="Consumer.__init__-39"><a href="#Consumer.__init__-39"><span class="linenos">39</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">ping_consumer_interval_ms</span> <span class="o">=</span> <span class="mi">30000</span>
</span><span id="Consumer.__init__-40"><a href="#Consumer.__init__-40"><span class="linenos">40</span></a>        <span class="k">if</span> <span class="n">error_callback</span> <span class="ow">is</span> <span class="kc">None</span><span class="p">:</span>
</span><span id="Consumer.__init__-41"><a href="#Consumer.__init__-41"><span class="linenos">41</span></a>            <span class="n">error_callback</span> <span class="o">=</span> <span class="n">default_error_handler</span>
</span><span id="Consumer.__init__-42"><a href="#Consumer.__init__-42"><span class="linenos">42</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">t_ping</span> <span class="o">=</span> <span class="n">asyncio</span><span class="o">.</span><span class="n">create_task</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">__ping_consumer</span><span class="p">(</span><span class="n">error_callback</span><span class="p">))</span>
</span><span id="Consumer.__init__-43"><a href="#Consumer.__init__-43"><span class="linenos">43</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">start_consume_from_sequence</span> <span class="o">=</span> <span class="n">start_consume_from_sequence</span>
</span><span id="Consumer.__init__-44"><a href="#Consumer.__init__-44"><span class="linenos">44</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">last_messages</span> <span class="o">=</span> <span class="n">last_messages</span>
</span><span id="Consumer.__init__-45"><a href="#Consumer.__init__-45"><span class="linenos">45</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">context</span> <span class="o">=</span> <span class="p">{}</span>
</span><span id="Consumer.__init__-46"><a href="#Consumer.__init__-46"><span class="linenos">46</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">dls_messages</span> <span class="o">=</span> <span class="p">[]</span>
</span><span id="Consumer.__init__-47"><a href="#Consumer.__init__-47"><span class="linenos">47</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">dls_current_index</span> <span class="o">=</span> <span class="mi">0</span>
</span><span id="Consumer.__init__-48"><a href="#Consumer.__init__-48"><span class="linenos">48</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">dls_callback_func</span> <span class="o">=</span> <span class="kc">None</span>
</span><span id="Consumer.__init__-49"><a href="#Consumer.__init__-49"><span class="linenos">49</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">t_dls</span> <span class="o">=</span> <span class="n">asyncio</span><span class="o">.</span><span class="n">create_task</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">__consume_dls</span><span class="p">())</span>
</span><span id="Consumer.__init__-50"><a href="#Consumer.__init__-50"><span class="linenos">50</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">t_consume</span> <span class="o">=</span> <span class="kc">None</span>
</span></pre></div>




</div>
<div id="Consumer.MAX_BATCH_SIZE" class="classattr">
<div class="attr variable">
<span class="name">MAX_BATCH_SIZE</span>        =
<span class="default_value">5000</span>


</div>
<a class="headerlink" href="#Consumer.MAX_BATCH_SIZE"></a>



</div>
<div id="Consumer.connection" class="classattr">
<div class="attr variable">
<span class="name">connection</span>


</div>
<a class="headerlink" href="#Consumer.connection"></a>



</div>
<div id="Consumer.station_name" class="classattr">
<div class="attr variable">
<span class="name">station_name</span>


</div>
<a class="headerlink" href="#Consumer.station_name"></a>



</div>
<div id="Consumer.consumer_name" class="classattr">
<div class="attr variable">
<span class="name">consumer_name</span>


</div>
<a class="headerlink" href="#Consumer.consumer_name"></a>



</div>
<div id="Consumer.consumer_group" class="classattr">
<div class="attr variable">
<span class="name">consumer_group</span>


</div>
<a class="headerlink" href="#Consumer.consumer_group"></a>



</div>
<div id="Consumer.pull_interval_ms" class="classattr">
<div class="attr variable">
<span class="name">pull_interval_ms</span>


</div>
<a class="headerlink" href="#Consumer.pull_interval_ms"></a>



</div>
<div id="Consumer.batch_size" class="classattr">
<div class="attr variable">
<span class="name">batch_size</span>


</div>
<a class="headerlink" href="#Consumer.batch_size"></a>



</div>
<div id="Consumer.batch_max_time_to_wait_ms" class="classattr">
<div class="attr variable">
<span class="name">batch_max_time_to_wait_ms</span>


</div>
<a class="headerlink" href="#Consumer.batch_max_time_to_wait_ms"></a>



</div>
<div id="Consumer.max_ack_time_ms" class="classattr">
<div class="attr variable">
<span class="name">max_ack_time_ms</span>


</div>
<a class="headerlink" href="#Consumer.max_ack_time_ms"></a>



</div>
<div id="Consumer.max_msg_deliveries" class="classattr">
<div class="attr variable">
<span class="name">max_msg_deliveries</span>


</div>
<a class="headerlink" href="#Consumer.max_msg_deliveries"></a>



</div>
<div id="Consumer.ping_consumer_interval_ms" class="classattr">
<div class="attr variable">
<span class="name">ping_consumer_interval_ms</span>


</div>
<a class="headerlink" href="#Consumer.ping_consumer_interval_ms"></a>



</div>
<div id="Consumer.t_ping" class="classattr">
<div class="attr variable">
<span class="name">t_ping</span>


</div>
<a class="headerlink" href="#Consumer.t_ping"></a>



</div>
<div id="Consumer.start_consume_from_sequence" class="classattr">
<div class="attr variable">
<span class="name">start_consume_from_sequence</span>


</div>
<a class="headerlink" href="#Consumer.start_consume_from_sequence"></a>



</div>
<div id="Consumer.last_messages" class="classattr">
<div class="attr variable">
<span class="name">last_messages</span>


</div>
<a class="headerlink" href="#Consumer.last_messages"></a>



</div>
<div id="Consumer.context" class="classattr">
<div class="attr variable">
<span class="name">context</span>


</div>
<a class="headerlink" href="#Consumer.context"></a>



</div>
<div id="Consumer.dls_messages" class="classattr">
<div class="attr variable">
<span class="name">dls_messages</span>


</div>
<a class="headerlink" href="#Consumer.dls_messages"></a>



</div>
<div id="Consumer.dls_current_index" class="classattr">
<div class="attr variable">
<span class="name">dls_current_index</span>


</div>
<a class="headerlink" href="#Consumer.dls_current_index"></a>



</div>
<div id="Consumer.dls_callback_func" class="classattr">
<div class="attr variable">
<span class="name">dls_callback_func</span>


</div>
<a class="headerlink" href="#Consumer.dls_callback_func"></a>



</div>
<div id="Consumer.t_dls" class="classattr">
<div class="attr variable">
<span class="name">t_dls</span>


</div>
<a class="headerlink" href="#Consumer.t_dls"></a>



</div>
<div id="Consumer.t_consume" class="classattr">
<div class="attr variable">
<span class="name">t_consume</span>


</div>
<a class="headerlink" href="#Consumer.t_consume"></a>



</div>
<div id="Consumer.set_context" class="classattr">
<input id="Consumer.set_context-view-source" class="view-source-toggle-state" type="checkbox" aria-hidden="true" tabindex="-1">
<div class="attr function">

<span class="def">def</span>
<span class="name">set_context</span><span class="signature pdoc-code condensed">(<span class="param"><span class="bp">self</span>, </span><span class="param"><span class="n">context</span></span><span class="return-annotation">):</span></span>

<label class="view-source-button" for="Consumer.set_context-view-source"><span>View Source</span></label>

</div>
<a class="headerlink" href="#Consumer.set_context"></a>
<div class="pdoc-code codehilite"><pre><span></span><span id="Consumer.set_context-52"><a href="#Consumer.set_context-52"><span class="linenos">52</span></a>    <span class="k">def</span> <span class="nf">set_context</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">context</span><span class="p">):</span>
</span><span id="Consumer.set_context-53"><a href="#Consumer.set_context-53"><span class="linenos">53</span></a><span class="w">        </span><span class="sd">&quot;&quot;&quot;Set a context (dict) that will be passed to each message handler call.&quot;&quot;&quot;</span>
</span><span id="Consumer.set_context-54"><a href="#Consumer.set_context-54"><span class="linenos">54</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">context</span> <span class="o">=</span> <span class="n">context</span>
</span></pre></div>


<div class="docstring"><p>Set a context (dict) that will be passed to each message handler call.</p>
</div>


</div>
<div id="Consumer.consume" class="classattr">
<input id="Consumer.consume-view-source" class="view-source-toggle-state" type="checkbox" aria-hidden="true" tabindex="-1">
<div class="attr function">

<span class="def">def</span>
<span class="name">consume</span><span class="signature pdoc-code condensed">(<span class="param"><span class="bp">self</span>, </span><span class="param"><span class="n">callback</span></span><span class="return-annotation">):</span></span>

<label class="view-source-button" for="Consumer.consume-view-source"><span>View Source</span></label>

</div>
<a class="headerlink" href="#Consumer.consume"></a>
<div class="pdoc-code codehilite"><pre><span></span><span id="Consumer.consume-56"><a href="#Consumer.consume-56"><span class="linenos">56</span></a>    <span class="k">def</span> <span class="nf">consume</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">callback</span><span class="p">):</span>
</span><span id="Consumer.consume-57"><a href="#Consumer.consume-57"><span class="linenos">57</span></a><span class="w">        </span><span class="sd">&quot;&quot;&quot;</span>
</span><span id="Consumer.consume-58"><a href="#Consumer.consume-58"><span class="linenos">58</span></a><span class="sd">        This method starts consuming events from the specified station and invokes the provided callback function for each batch of messages received.</span>
</span><span id="Consumer.consume-59"><a href="#Consumer.consume-59"><span class="linenos">59</span></a>
</span><span id="Consumer.consume-60"><a href="#Consumer.consume-60"><span class="linenos">60</span></a><span class="sd">        Parameters:</span>
</span><span id="Consumer.consume-61"><a href="#Consumer.consume-61"><span class="linenos">61</span></a><span class="sd">            callback (function): A function that will be called with each batch of messages received. The function should have the following signature:</span>
</span><span id="Consumer.consume-62"><a href="#Consumer.consume-62"><span class="linenos">62</span></a><span class="sd">                - `callback(messages: List[Message], error: Optional[MemphisError], context: Dict) -&gt; Awaitable[None]`</span>
</span><span id="Consumer.consume-63"><a href="#Consumer.consume-63"><span class="linenos">63</span></a><span class="sd">                - `messages`: A list of `Message` objects representing the batch of messages received.</span>
</span><span id="Consumer.consume-64"><a href="#Consumer.consume-64"><span class="linenos">64</span></a><span class="sd">                - `error`: An optional `MemphisError` object if there was an error while consuming the messages.</span>
</span><span id="Consumer.consume-65"><a href="#Consumer.consume-65"><span class="linenos">65</span></a><span class="sd">                - `context`: A dictionary representing the context that was set using the `set_context()` method.</span>
</span><span id="Consumer.consume-66"><a href="#Consumer.consume-66"><span class="linenos">66</span></a>
</span><span id="Consumer.consume-67"><a href="#Consumer.consume-67"><span class="linenos">67</span></a><span class="sd">        Example:</span>
</span><span id="Consumer.consume-68"><a href="#Consumer.consume-68"><span class="linenos">68</span></a><span class="sd">            import asyncio</span>
</span><span id="Consumer.consume-69"><a href="#Consumer.consume-69"><span class="linenos">69</span></a><span class="sd">            from memphis import Memphis</span>
</span><span id="Consumer.consume-70"><a href="#Consumer.consume-70"><span class="linenos">70</span></a>
</span><span id="Consumer.consume-71"><a href="#Consumer.consume-71"><span class="linenos">71</span></a><span class="sd">            async def message_handler(messages, error, context):</span>
</span><span id="Consumer.consume-72"><a href="#Consumer.consume-72"><span class="linenos">72</span></a><span class="sd">                if error:</span>
</span><span id="Consumer.consume-73"><a href="#Consumer.consume-73"><span class="linenos">73</span></a><span class="sd">                    print(f&quot;Error occurred: {error}&quot;)</span>
</span><span id="Consumer.consume-74"><a href="#Consumer.consume-74"><span class="linenos">74</span></a><span class="sd">                    return</span>
</span><span id="Consumer.consume-75"><a href="#Consumer.consume-75"><span class="linenos">75</span></a>
</span><span id="Consumer.consume-76"><a href="#Consumer.consume-76"><span class="linenos">76</span></a><span class="sd">                for message in messages:</span>
</span><span id="Consumer.consume-77"><a href="#Consumer.consume-77"><span class="linenos">77</span></a><span class="sd">                    print(f&quot;Received message: {message}&quot;)</span>
</span><span id="Consumer.consume-78"><a href="#Consumer.consume-78"><span class="linenos">78</span></a>
</span><span id="Consumer.consume-79"><a href="#Consumer.consume-79"><span class="linenos">79</span></a><span class="sd">            async def main():</span>
</span><span id="Consumer.consume-80"><a href="#Consumer.consume-80"><span class="linenos">80</span></a><span class="sd">                memphis = Memphis()</span>
</span><span id="Consumer.consume-81"><a href="#Consumer.consume-81"><span class="linenos">81</span></a><span class="sd">                await memphis.connect(host=&#39;localhost&#39;, username=&#39;user&#39;, password=&#39;pass&#39;)</span>
</span><span id="Consumer.consume-82"><a href="#Consumer.consume-82"><span class="linenos">82</span></a><span class="sd">                consumer = await memphis.consumer(station_name=&#39;my_station&#39;, consumer_name=&#39;my_consumer&#39;, consumer_group=&#39;my_group&#39;)</span>
</span><span id="Consumer.consume-83"><a href="#Consumer.consume-83"><span class="linenos">83</span></a><span class="sd">                consumer.set_context({&#39;key&#39;: &#39;value&#39;})</span>
</span><span id="Consumer.consume-84"><a href="#Consumer.consume-84"><span class="linenos">84</span></a><span class="sd">                consumer.consume(message_handler)</span>
</span><span id="Consumer.consume-85"><a href="#Consumer.consume-85"><span class="linenos">85</span></a>
</span><span id="Consumer.consume-86"><a href="#Consumer.consume-86"><span class="linenos">86</span></a><span class="sd">                # Keep the event loop running</span>
</span><span id="Consumer.consume-87"><a href="#Consumer.consume-87"><span class="linenos">87</span></a><span class="sd">                while True:</span>
</span><span id="Consumer.consume-88"><a href="#Consumer.consume-88"><span class="linenos">88</span></a><span class="sd">                    await asyncio.sleep(1)</span>
</span><span id="Consumer.consume-89"><a href="#Consumer.consume-89"><span class="linenos">89</span></a><span class="sd">            asyncio.run(main())</span>
</span><span id="Consumer.consume-90"><a href="#Consumer.consume-90"><span class="linenos">90</span></a><span class="sd">        &quot;&quot;&quot;</span>
</span><span id="Consumer.consume-91"><a href="#Consumer.consume-91"><span class="linenos">91</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">dls_callback_func</span> <span class="o">=</span> <span class="n">callback</span>
</span><span id="Consumer.consume-92"><a href="#Consumer.consume-92"><span class="linenos">92</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">t_consume</span> <span class="o">=</span> <span class="n">asyncio</span><span class="o">.</span><span class="n">create_task</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">__consume</span><span class="p">(</span><span class="n">callback</span><span class="p">))</span>
</span></pre></div>


<div class="docstring"><p>This method starts consuming events from the specified station and invokes the provided callback function for each batch of messages received.</p>

<p>Parameters:
callback (function): A function that will be called with each batch of messages received. The function should have the following signature:
- <code>callback(messages: List[Message], error: Optional[MemphisError], context: Dict) -&gt; Awaitable[None]</code>
- <code>messages</code>: A list of <code>Message</code> objects representing the batch of messages received.
- <code>error</code>: An optional <code>MemphisError</code> object if there was an error while consuming the messages.
- <code><a href="#Consumer.context">context</a></code>: A dictionary representing the context that was set using the <code><a href="#Consumer.set_context">set_context()</a></code> method.</p>

<p>Example:
import asyncio
from memphis import Memphis</p>

<pre><code>async def message_handler(messages, error, context):
if error:
print(f"Error occurred: {error}")
return

for message in messages:
print(f"Received message: {message}")

async def main():
memphis = Memphis()
await memphis.connect(host='localhost', username='user', password='pass')
consumer = await <a href="">memphis.consumer</a>(station_name='my_station', consumer_name='my_consumer', consumer_group='my_group')
consumer.set_context({'key': 'value'})
consumer.consume(message_handler)

# Keep the event loop running
while True:
await asyncio.sleep(1)
asyncio.run(main())
</code></pre>
</div>


</div>
<div id="Consumer.fetch" class="classattr">
<input id="Consumer.fetch-view-source" class="view-source-toggle-state" type="checkbox" aria-hidden="true" tabindex="-1">
<div class="attr function">

<span class="def">async def</span>
<span class="name">fetch</span><span class="signature pdoc-code condensed">(<span class="param"><span class="bp">self</span>, </span><span class="param"><span class="n">batch_size</span><span class="p">:</span> <span class="nb">int</span> <span class="o">=</span> <span class="mi">10</span></span><span class="return-annotation">):</span></span>

<label class="view-source-button" for="Consumer.fetch-view-source"><span>View Source</span></label>

</div>
<a class="headerlink" href="#Consumer.fetch"></a>
<div class="pdoc-code codehilite"><pre><span></span><span id="Consumer.fetch-152"><a href="#Consumer.fetch-152"><span class="linenos">152</span></a>    <span class="k">async</span> <span class="k">def</span> <span class="nf">fetch</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">batch_size</span><span class="p">:</span> <span class="nb">int</span> <span class="o">=</span> <span class="mi">10</span><span class="p">):</span>
</span><span id="Consumer.fetch-153"><a href="#Consumer.fetch-153"><span class="linenos">153</span></a><span class="w">        </span><span class="sd">&quot;&quot;&quot;</span>
</span><span id="Consumer.fetch-154"><a href="#Consumer.fetch-154"><span class="linenos">154</span></a><span class="sd">        Fetch a batch of messages.</span>
</span><span id="Consumer.fetch-155"><a href="#Consumer.fetch-155"><span class="linenos">155</span></a>
</span><span id="Consumer.fetch-156"><a href="#Consumer.fetch-156"><span class="linenos">156</span></a><span class="sd">        Returns a list of Message objects. If the connection is</span>
</span><span id="Consumer.fetch-157"><a href="#Consumer.fetch-157"><span class="linenos">157</span></a><span class="sd">        not active or no messages are recieved before timing out,</span>
</span><span id="Consumer.fetch-158"><a href="#Consumer.fetch-158"><span class="linenos">158</span></a><span class="sd">        an empty list is returned.</span>
</span><span id="Consumer.fetch-159"><a href="#Consumer.fetch-159"><span class="linenos">159</span></a>
</span><span id="Consumer.fetch-160"><a href="#Consumer.fetch-160"><span class="linenos">160</span></a><span class="sd">        Example:</span>
</span><span id="Consumer.fetch-161"><a href="#Consumer.fetch-161"><span class="linenos">161</span></a>
</span><span id="Consumer.fetch-162"><a href="#Consumer.fetch-162"><span class="linenos">162</span></a><span class="sd">            import asyncio</span>
</span><span id="Consumer.fetch-163"><a href="#Consumer.fetch-163"><span class="linenos">163</span></a><span class="sd">            </span>
</span><span id="Consumer.fetch-164"><a href="#Consumer.fetch-164"><span class="linenos">164</span></a><span class="sd">            from memphis import Memphis</span>
</span><span id="Consumer.fetch-165"><a href="#Consumer.fetch-165"><span class="linenos">165</span></a>
</span><span id="Consumer.fetch-166"><a href="#Consumer.fetch-166"><span class="linenos">166</span></a><span class="sd">            async def main(host, username, password, station):</span>
</span><span id="Consumer.fetch-167"><a href="#Consumer.fetch-167"><span class="linenos">167</span></a><span class="sd">                memphis = Memphis()</span>
</span><span id="Consumer.fetch-168"><a href="#Consumer.fetch-168"><span class="linenos">168</span></a><span class="sd">                await memphis.connect(host=host,</span>
</span><span id="Consumer.fetch-169"><a href="#Consumer.fetch-169"><span class="linenos">169</span></a><span class="sd">                                      username=username,</span>
</span><span id="Consumer.fetch-170"><a href="#Consumer.fetch-170"><span class="linenos">170</span></a><span class="sd">                                      password=password)</span>
</span><span id="Consumer.fetch-171"><a href="#Consumer.fetch-171"><span class="linenos">171</span></a><span class="sd">            </span>
</span><span id="Consumer.fetch-172"><a href="#Consumer.fetch-172"><span class="linenos">172</span></a><span class="sd">                consumer = await memphis.consumer(station_name=station,</span>
</span><span id="Consumer.fetch-173"><a href="#Consumer.fetch-173"><span class="linenos">173</span></a><span class="sd">                                                  consumer_name=&quot;test-consumer&quot;,</span>
</span><span id="Consumer.fetch-174"><a href="#Consumer.fetch-174"><span class="linenos">174</span></a><span class="sd">                                                  consumer_group=&quot;test-consumer-group&quot;)</span>
</span><span id="Consumer.fetch-175"><a href="#Consumer.fetch-175"><span class="linenos">175</span></a><span class="sd">            </span>
</span><span id="Consumer.fetch-176"><a href="#Consumer.fetch-176"><span class="linenos">176</span></a><span class="sd">                while True:</span>
</span><span id="Consumer.fetch-177"><a href="#Consumer.fetch-177"><span class="linenos">177</span></a><span class="sd">                    batch = await consumer.fetch()</span>
</span><span id="Consumer.fetch-178"><a href="#Consumer.fetch-178"><span class="linenos">178</span></a><span class="sd">                    print(&quot;Recieved {} messages&quot;.format(len(batch)))</span>
</span><span id="Consumer.fetch-179"><a href="#Consumer.fetch-179"><span class="linenos">179</span></a><span class="sd">                    for msg in batch:</span>
</span><span id="Consumer.fetch-180"><a href="#Consumer.fetch-180"><span class="linenos">180</span></a><span class="sd">                        serialized_record = msg.get_data()</span>
</span><span id="Consumer.fetch-181"><a href="#Consumer.fetch-181"><span class="linenos">181</span></a><span class="sd">                        print(&quot;Message:&quot;, serialized_record)</span>
</span><span id="Consumer.fetch-182"><a href="#Consumer.fetch-182"><span class="linenos">182</span></a><span class="sd">            </span>
</span><span id="Consumer.fetch-183"><a href="#Consumer.fetch-183"><span class="linenos">183</span></a><span class="sd">                await memphis.close()</span>
</span><span id="Consumer.fetch-184"><a href="#Consumer.fetch-184"><span class="linenos">184</span></a>
</span><span id="Consumer.fetch-185"><a href="#Consumer.fetch-185"><span class="linenos">185</span></a><span class="sd">            if __name__ == &#39;__main__&#39;:</span>
</span><span id="Consumer.fetch-186"><a href="#Consumer.fetch-186"><span class="linenos">186</span></a><span class="sd">                asyncio.run(main(host,</span>
</span><span id="Consumer.fetch-187"><a href="#Consumer.fetch-187"><span class="linenos">187</span></a><span class="sd">                                 username,</span>
</span><span id="Consumer.fetch-188"><a href="#Consumer.fetch-188"><span class="linenos">188</span></a><span class="sd">                                 password,</span>
</span><span id="Consumer.fetch-189"><a href="#Consumer.fetch-189"><span class="linenos">189</span></a><span class="sd">                                 station))</span>
</span><span id="Consumer.fetch-190"><a href="#Consumer.fetch-190"><span class="linenos">190</span></a><span class="sd">        </span>
</span><span id="Consumer.fetch-191"><a href="#Consumer.fetch-191"><span class="linenos">191</span></a><span class="sd">        &quot;&quot;&quot;</span>
</span><span id="Consumer.fetch-192"><a href="#Consumer.fetch-192"><span class="linenos">192</span></a>        <span class="n">messages</span> <span class="o">=</span> <span class="p">[]</span>
</span><span id="Consumer.fetch-193"><a href="#Consumer.fetch-193"><span class="linenos">193</span></a>        <span class="k">if</span> <span class="bp">self</span><span class="o">.</span><span class="n">connection</span><span class="o">.</span><span class="n">is_connection_active</span><span class="p">:</span>
</span><span id="Consumer.fetch-194"><a href="#Consumer.fetch-194"><span class="linenos">194</span></a>            <span class="k">try</span><span class="p">:</span>
</span><span id="Consumer.fetch-195"><a href="#Consumer.fetch-195"><span class="linenos">195</span></a>                <span class="k">if</span> <span class="n">batch_size</span> <span class="o">&gt;</span> <span class="bp">self</span><span class="o">.</span><span class="n">MAX_BATCH_SIZE</span><span class="p">:</span>
</span><span id="Consumer.fetch-196"><a href="#Consumer.fetch-196"><span class="linenos">196</span></a>                    <span class="k">raise</span> <span class="n">MemphisError</span><span class="p">(</span>
</span><span id="Consumer.fetch-197"><a href="#Consumer.fetch-197"><span class="linenos">197</span></a>                        <span class="sa">f</span><span class="s2">&quot;Batch size can not be greater than </span><span class="si">{</span><span class="bp">self</span><span class="o">.</span><span class="n">MAX_BATCH_SIZE</span><span class="si">}</span><span class="s2">&quot;</span><span class="p">)</span>
</span><span id="Consumer.fetch-198"><a href="#Consumer.fetch-198"><span class="linenos">198</span></a>                <span class="bp">self</span><span class="o">.</span><span class="n">batch_size</span> <span class="o">=</span> <span class="n">batch_size</span>
</span><span id="Consumer.fetch-199"><a href="#Consumer.fetch-199"><span class="linenos">199</span></a>                <span class="k">if</span> <span class="nb">len</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">dls_messages</span><span class="p">)</span> <span class="o">&gt;</span> <span class="mi">0</span><span class="p">:</span>
</span><span id="Consumer.fetch-200"><a href="#Consumer.fetch-200"><span class="linenos">200</span></a>                    <span class="k">if</span> <span class="nb">len</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">dls_messages</span><span class="p">)</span> <span class="o">&lt;=</span> <span class="n">batch_size</span><span class="p">:</span>
</span><span id="Consumer.fetch-201"><a href="#Consumer.fetch-201"><span class="linenos">201</span></a>                        <span class="n">messages</span> <span class="o">=</span> <span class="bp">self</span><span class="o">.</span><span class="n">dls_messages</span>
</span><span id="Consumer.fetch-202"><a href="#Consumer.fetch-202"><span class="linenos">202</span></a>                        <span class="bp">self</span><span class="o">.</span><span class="n">dls_messages</span> <span class="o">=</span> <span class="p">[]</span>
</span><span id="Consumer.fetch-203"><a href="#Consumer.fetch-203"><span class="linenos">203</span></a>                        <span class="bp">self</span><span class="o">.</span><span class="n">dls_current_index</span> <span class="o">=</span> <span class="mi">0</span>
</span><span id="Consumer.fetch-204"><a href="#Consumer.fetch-204"><span class="linenos">204</span></a>                    <span class="k">else</span><span class="p">:</span>
</span><span id="Consumer.fetch-205"><a href="#Consumer.fetch-205"><span class="linenos">205</span></a>                        <span class="n">messages</span> <span class="o">=</span> <span class="bp">self</span><span class="o">.</span><span class="n">dls_messages</span><span class="p">[</span><span class="mi">0</span><span class="p">:</span><span class="n">batch_size</span><span class="p">]</span>
</span><span id="Consumer.fetch-206"><a href="#Consumer.fetch-206"><span class="linenos">206</span></a>                        <span class="k">del</span> <span class="bp">self</span><span class="o">.</span><span class="n">dls_messages</span><span class="p">[</span><span class="mi">0</span><span class="p">:</span><span class="n">batch_size</span><span class="p">]</span>
</span><span id="Consumer.fetch-207"><a href="#Consumer.fetch-207"><span class="linenos">207</span></a>                        <span class="bp">self</span><span class="o">.</span><span class="n">dls_current_index</span> <span class="o">-=</span> <span class="nb">len</span><span class="p">(</span><span class="n">messages</span><span class="p">)</span>
</span><span id="Consumer.fetch-208"><a href="#Consumer.fetch-208"><span class="linenos">208</span></a>                    <span class="k">return</span> <span class="n">messages</span>
</span><span id="Consumer.fetch-209"><a href="#Consumer.fetch-209"><span class="linenos">209</span></a>
</span><span id="Consumer.fetch-210"><a href="#Consumer.fetch-210"><span class="linenos">210</span></a>                <span class="n">durable_name</span> <span class="o">=</span> <span class="s2">&quot;&quot;</span>
</span><span id="Consumer.fetch-211"><a href="#Consumer.fetch-211"><span class="linenos">211</span></a>                <span class="k">if</span> <span class="bp">self</span><span class="o">.</span><span class="n">consumer_group</span> <span class="o">!=</span> <span class="s2">&quot;&quot;</span><span class="p">:</span>
</span><span id="Consumer.fetch-212"><a href="#Consumer.fetch-212"><span class="linenos">212</span></a>                    <span class="n">durable_name</span> <span class="o">=</span> <span class="n">get_internal_name</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">consumer_group</span><span class="p">)</span>
</span><span id="Consumer.fetch-213"><a href="#Consumer.fetch-213"><span class="linenos">213</span></a>                <span class="k">else</span><span class="p">:</span>
</span><span id="Consumer.fetch-214"><a href="#Consumer.fetch-214"><span class="linenos">214</span></a>                    <span class="n">durable_name</span> <span class="o">=</span> <span class="n">get_internal_name</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">consumer_name</span><span class="p">)</span>
</span><span id="Consumer.fetch-215"><a href="#Consumer.fetch-215"><span class="linenos">215</span></a>                <span class="n">subject</span> <span class="o">=</span> <span class="n">get_internal_name</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">station_name</span><span class="p">)</span>
</span><span id="Consumer.fetch-216"><a href="#Consumer.fetch-216"><span class="linenos">216</span></a>                <span class="bp">self</span><span class="o">.</span><span class="n">psub</span> <span class="o">=</span> <span class="k">await</span> <span class="bp">self</span><span class="o">.</span><span class="n">connection</span><span class="o">.</span><span class="n">broker_connection</span><span class="o">.</span><span class="n">pull_subscribe</span><span class="p">(</span>
</span><span id="Consumer.fetch-217"><a href="#Consumer.fetch-217"><span class="linenos">217</span></a>                    <span class="n">subject</span> <span class="o">+</span> <span class="s2">&quot;.final&quot;</span><span class="p">,</span> <span class="n">durable</span><span class="o">=</span><span class="n">durable_name</span>
</span><span id="Consumer.fetch-218"><a href="#Consumer.fetch-218"><span class="linenos">218</span></a>                <span class="p">)</span>
</span><span id="Consumer.fetch-219"><a href="#Consumer.fetch-219"><span class="linenos">219</span></a>                <span class="n">msgs</span> <span class="o">=</span> <span class="k">await</span> <span class="bp">self</span><span class="o">.</span><span class="n">psub</span><span class="o">.</span><span class="n">fetch</span><span class="p">(</span><span class="n">batch_size</span><span class="p">)</span>
</span><span id="Consumer.fetch-220"><a href="#Consumer.fetch-220"><span class="linenos">220</span></a>                <span class="k">for</span> <span class="n">msg</span> <span class="ow">in</span> <span class="n">msgs</span><span class="p">:</span>
</span><span id="Consumer.fetch-221"><a href="#Consumer.fetch-221"><span class="linenos">221</span></a>                    <span class="n">messages</span><span class="o">.</span><span class="n">append</span><span class="p">(</span>
</span><span id="Consumer.fetch-222"><a href="#Consumer.fetch-222"><span class="linenos">222</span></a>                        <span class="n">Message</span><span class="p">(</span><span class="n">msg</span><span class="p">,</span> <span class="bp">self</span><span class="o">.</span><span class="n">connection</span><span class="p">,</span> <span class="bp">self</span><span class="o">.</span><span class="n">consumer_group</span><span class="p">))</span>
</span><span id="Consumer.fetch-223"><a href="#Consumer.fetch-223"><span class="linenos">223</span></a>                <span class="k">return</span> <span class="n">messages</span>
</span><span id="Consumer.fetch-224"><a href="#Consumer.fetch-224"><span class="linenos">224</span></a>            <span class="k">except</span> <span class="ne">Exception</span> <span class="k">as</span> <span class="n">e</span><span class="p">:</span>
</span><span id="Consumer.fetch-225"><a href="#Consumer.fetch-225"><span class="linenos">225</span></a>                <span class="k">if</span> <span class="s2">&quot;timeout&quot;</span> <span class="ow">not</span> <span class="ow">in</span> <span class="nb">str</span><span class="p">(</span><span class="n">e</span><span class="p">)</span><span class="o">.</span><span class="n">lower</span><span class="p">():</span>
</span><span id="Consumer.fetch-226"><a href="#Consumer.fetch-226"><span class="linenos">226</span></a>                    <span class="k">raise</span> <span class="n">MemphisError</span><span class="p">(</span><span class="nb">str</span><span class="p">(</span><span class="n">e</span><span class="p">))</span> <span class="kn">from</span> <span class="nn">e</span>
</span><span id="Consumer.fetch-227"><a href="#Consumer.fetch-227"><span class="linenos">227</span></a>
</span><span id="Consumer.fetch-228"><a href="#Consumer.fetch-228"><span class="linenos">228</span></a>        <span class="k">return</span> <span class="n">messages</span>
</span></pre></div>


<div class="docstring"><p>Fetch a batch of messages.</p>

<p>Returns a list of Message objects. If the connection is
not active or no messages are recieved before timing out,
an empty list is returned.</p>

<p>Example:</p>

<pre><code>import asyncio

from memphis import Memphis

async def main(host, username, password, station):
memphis = Memphis()
await memphis.connect(host=host,
username=username,
password=password)

consumer = await <a href="">memphis.consumer</a>(station_name=station,
consumer_name="test-consumer",
consumer_group="test-consumer-group")

while True:
batch = await consumer.fetch()
print("Recieved {} messages".format(len(batch)))
for msg in batch:
serialized_record = msg.get_data()
print("Message:", serialized_record)

await memphis.close()

if __name__ == '__main__':
asyncio.run(main(host,
username,
password,
station))
</code></pre>
</div>


</div>
<div id="Consumer.destroy" class="classattr">
<input id="Consumer.destroy-view-source" class="view-source-toggle-state" type="checkbox" aria-hidden="true" tabindex="-1">
<div class="attr function">

<span class="def">async def</span>
<span class="name">destroy</span><span class="signature pdoc-code condensed">(<span class="param"><span class="bp">self</span></span><span class="return-annotation">):</span></span>

<label class="view-source-button" for="Consumer.destroy-view-source"><span>View Source</span></label>

</div>
<a class="headerlink" href="#Consumer.destroy"></a>
<div class="pdoc-code codehilite"><pre><span></span><span id="Consumer.destroy-242"><a href="#Consumer.destroy-242"><span class="linenos">242</span></a>    <span class="k">async</span> <span class="k">def</span> <span class="nf">destroy</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
</span><span id="Consumer.destroy-243"><a href="#Consumer.destroy-243"><span class="linenos">243</span></a><span class="w">        </span><span class="sd">&quot;&quot;&quot;Destroy the consumer.&quot;&quot;&quot;</span>
</span><span id="Consumer.destroy-244"><a href="#Consumer.destroy-244"><span class="linenos">244</span></a>        <span class="k">if</span> <span class="bp">self</span><span class="o">.</span><span class="n">t_consume</span> <span class="ow">is</span> <span class="ow">not</span> <span class="kc">None</span><span class="p">:</span>
</span><span id="Consumer.destroy-245"><a href="#Consumer.destroy-245"><span class="linenos">245</span></a>            <span class="bp">self</span><span class="o">.</span><span class="n">t_consume</span><span class="o">.</span><span class="n">cancel</span><span class="p">()</span>
</span><span id="Consumer.destroy-246"><a href="#Consumer.destroy-246"><span class="linenos">246</span></a>        <span class="k">if</span> <span class="bp">self</span><span class="o">.</span><span class="n">t_dls</span> <span class="ow">is</span> <span class="ow">not</span> <span class="kc">None</span><span class="p">:</span>
</span><span id="Consumer.destroy-247"><a href="#Consumer.destroy-247"><span class="linenos">247</span></a>            <span class="bp">self</span><span class="o">.</span><span class="n">t_dls</span><span class="o">.</span><span class="n">cancel</span><span class="p">()</span>
</span><span id="Consumer.destroy-248"><a href="#Consumer.destroy-248"><span class="linenos">248</span></a>        <span class="k">if</span> <span class="bp">self</span><span class="o">.</span><span class="n">t_ping</span> <span class="ow">is</span> <span class="ow">not</span> <span class="kc">None</span><span class="p">:</span>
</span><span id="Consumer.destroy-249"><a href="#Consumer.destroy-249"><span class="linenos">249</span></a>            <span class="bp">self</span><span class="o">.</span><span class="n">t_ping</span><span class="o">.</span><span class="n">cancel</span><span class="p">()</span>
</span><span id="Consumer.destroy-250"><a href="#Consumer.destroy-250"><span class="linenos">250</span></a>        <span class="bp">self</span><span class="o">.</span><span class="n">pull_interval_ms</span> <span class="o">=</span> <span class="kc">None</span>
</span><span id="Consumer.destroy-251"><a href="#Consumer.destroy-251"><span class="linenos">251</span></a>        <span class="k">try</span><span class="p">:</span>
</span><span id="Consumer.destroy-252"><a href="#Consumer.destroy-252"><span class="linenos">252</span></a>            <span class="n">destroy_consumer_req</span> <span class="o">=</span> <span class="p">{</span>
</span><span id="Consumer.destroy-253"><a href="#Consumer.destroy-253"><span class="linenos">253</span></a>                <span class="s2">&quot;name&quot;</span><span class="p">:</span> <span class="bp">self</span><span class="o">.</span><span class="n">consumer_name</span><span class="p">,</span>
</span><span id="Consumer.destroy-254"><a href="#Consumer.destroy-254"><span class="linenos">254</span></a>                <span class="s2">&quot;station_name&quot;</span><span class="p">:</span> <span class="bp">self</span><span class="o">.</span><span class="n">station_name</span><span class="p">,</span>
</span><span id="Consumer.destroy-255"><a href="#Consumer.destroy-255"><span class="linenos">255</span></a>                <span class="s2">&quot;username&quot;</span><span class="p">:</span> <span class="bp">self</span><span class="o">.</span><span class="n">connection</span><span class="o">.</span><span class="n">username</span><span class="p">,</span>
</span><span id="Consumer.destroy-256"><a href="#Consumer.destroy-256"><span class="linenos">256</span></a>                <span class="s2">&quot;connection_id&quot;</span><span class="p">:</span> <span class="bp">self</span><span class="o">.</span><span class="n">connection</span><span class="o">.</span><span class="n">connection_id</span><span class="p">,</span>
</span><span id="Consumer.destroy-257"><a href="#Consumer.destroy-257"><span class="linenos">257</span></a>                <span class="s2">&quot;req_version&quot;</span><span class="p">:</span> <span class="mi">1</span><span class="p">,</span>
</span><span id="Consumer.destroy-258"><a href="#Consumer.destroy-258"><span class="linenos">258</span></a>            <span class="p">}</span>
</span><span id="Consumer.destroy-259"><a href="#Consumer.destroy-259"><span class="linenos">259</span></a>            <span class="n">consumer_name</span> <span class="o">=</span> <span class="n">json</span><span class="o">.</span><span class="n">dumps</span><span class="p">(</span>
</span><span id="Consumer.destroy-260"><a href="#Consumer.destroy-260"><span class="linenos">260</span></a>                <span class="n">destroy_consumer_req</span><span class="p">,</span> <span class="n">indent</span><span class="o">=</span><span class="mi">2</span><span class="p">)</span><span class="o">.</span><span class="n">encode</span><span class="p">(</span><span class="s2">&quot;utf-8&quot;</span><span class="p">)</span>
</span><span id="Consumer.destroy-261"><a href="#Consumer.destroy-261"><span class="linenos">261</span></a>            <span class="n">res</span> <span class="o">=</span> <span class="k">await</span> <span class="bp">self</span><span class="o">.</span><span class="n">connection</span><span class="o">.</span><span class="n">broker_manager</span><span class="o">.</span><span class="n">request</span><span class="p">(</span>
</span><span id="Consumer.destroy-262"><a href="#Consumer.destroy-262"><span class="linenos">262</span></a>                <span class="s2">&quot;$memphis_consumer_destructions&quot;</span><span class="p">,</span> <span class="n">consumer_name</span><span class="p">,</span> <span class="n">timeout</span><span class="o">=</span><span class="mi">5</span>
</span><span id="Consumer.destroy-263"><a href="#Consumer.destroy-263"><span class="linenos">263</span></a>            <span class="p">)</span>
</span><span id="Consumer.destroy-264"><a href="#Consumer.destroy-264"><span class="linenos">264</span></a>            <span class="n">error</span> <span class="o">=</span> <span class="n">res</span><span class="o">.</span><span class="n">data</span><span class="o">.</span><span class="n">decode</span><span class="p">(</span><span class="s2">&quot;utf-8&quot;</span><span class="p">)</span>
</span><span id="Consumer.destroy-265"><a href="#Consumer.destroy-265"><span class="linenos">265</span></a>            <span class="k">if</span> <span class="n">error</span> <span class="o">!=</span> <span class="s2">&quot;&quot;</span> <span class="ow">and</span> <span class="ow">not</span> <span class="s2">&quot;not exist&quot;</span> <span class="ow">in</span> <span class="n">error</span><span class="p">:</span>
</span><span id="Consumer.destroy-266"><a href="#Consumer.destroy-266"><span class="linenos">266</span></a>                <span class="k">raise</span> <span class="n">MemphisError</span><span class="p">(</span><span class="n">error</span><span class="p">)</span>
</span><span id="Consumer.destroy-267"><a href="#Consumer.destroy-267"><span class="linenos">267</span></a>            <span class="bp">self</span><span class="o">.</span><span class="n">dls_messages</span><span class="o">.</span><span class="n">clear</span><span class="p">()</span>
</span><span id="Consumer.destroy-268"><a href="#Consumer.destroy-268"><span class="linenos">268</span></a>            <span class="n">internal_station_name</span> <span class="o">=</span> <span class="n">get_internal_name</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">station_name</span><span class="p">)</span>
</span><span id="Consumer.destroy-269"><a href="#Consumer.destroy-269"><span class="linenos">269</span></a>            <span class="n">map_key</span> <span class="o">=</span> <span class="n">internal_station_name</span> <span class="o">+</span> <span class="s2">&quot;_&quot;</span> <span class="o">+</span> <span class="bp">self</span><span class="o">.</span><span class="n">consumer_name</span><span class="o">.</span><span class="n">lower</span><span class="p">()</span>
</span><span id="Consumer.destroy-270"><a href="#Consumer.destroy-270"><span class="linenos">270</span></a>            <span class="k">del</span> <span class="bp">self</span><span class="o">.</span><span class="n">connection</span><span class="o">.</span><span class="n">consumers_map</span><span class="p">[</span><span class="n">map_key</span><span class="p">]</span>
</span><span id="Consumer.destroy-271"><a href="#Consumer.destroy-271"><span class="linenos">271</span></a>        <span class="k">except</span> <span class="ne">Exception</span> <span class="k">as</span> <span class="n">e</span><span class="p">:</span>
</span><span id="Consumer.destroy-272"><a href="#Consumer.destroy-272"><span class="linenos">272</span></a>            <span class="k">raise</span> <span class="n">MemphisError</span><span class="p">(</span><span class="nb">str</span><span class="p">(</span><span class="n">e</span><span class="p">))</span> <span class="kn">from</span> <span class="nn">e</span>
</span></pre></div>


<div class="docstring"><p>Destroy the consumer.</p>
</div>


</div>
</section>
</main>


<style>pre{line-height:125%;}span.linenos{color:inherit; background-color:transparent; padding-left:5px; padding-right:20px;}.pdoc-code .hll{background-color:#ffffcc}.pdoc-code{background:#f8f8f8;}.pdoc-code .c{color:#3D7B7B; font-style:italic}.pdoc-code .err{border:1px solid #FF0000}.pdoc-code .k{color:#008000; font-weight:bold}.pdoc-code .o{color:#666666}.pdoc-code .ch{color:#3D7B7B; font-style:italic}.pdoc-code .cm{color:#3D7B7B; font-style:italic}.pdoc-code .cp{color:#9C6500}.pdoc-code .cpf{color:#3D7B7B; font-style:italic}.pdoc-code .c1{color:#3D7B7B; font-style:italic}.pdoc-code .cs{color:#3D7B7B; font-style:italic}.pdoc-code .gd{color:#A00000}.pdoc-code .ge{font-style:italic}.pdoc-code .gr{color:#E40000}.pdoc-code .gh{color:#000080; font-weight:bold}.pdoc-code .gi{color:#008400}.pdoc-code .go{color:#717171}.pdoc-code .gp{color:#000080; font-weight:bold}.pdoc-code .gs{font-weight:bold}.pdoc-code .gu{color:#800080; font-weight:bold}.pdoc-code .gt{color:#0044DD}.pdoc-code .kc{color:#008000; font-weight:bold}.pdoc-code .kd{color:#008000; font-weight:bold}.pdoc-code .kn{color:#008000; font-weight:bold}.pdoc-code .kp{color:#008000}.pdoc-code .kr{color:#008000; font-weight:bold}.pdoc-code .kt{color:#B00040}.pdoc-code .m{color:#666666}.pdoc-code .s{color:#BA2121}.pdoc-code .na{color:#687822}.pdoc-code .nb{color:#008000}.pdoc-code .nc{color:#0000FF; font-weight:bold}.pdoc-code .no{color:#880000}.pdoc-code .nd{color:#AA22FF}.pdoc-code .ni{color:#717171; font-weight:bold}.pdoc-code .ne{color:#CB3F38; font-weight:bold}.pdoc-code .nf{color:#0000FF}.pdoc-code .nl{color:#767600}.pdoc-code .nn{color:#0000FF; font-weight:bold}.pdoc-code .nt{color:#008000; font-weight:bold}.pdoc-code .nv{color:#19177C}.pdoc-code .ow{color:#AA22FF; font-weight:bold}.pdoc-code .w{color:#bbbbbb}.pdoc-code .mb{color:#666666}.pdoc-code .mf{color:#666666}.pdoc-code .mh{color:#666666}.pdoc-code .mi{color:#666666}.pdoc-code .mo{color:#666666}.pdoc-code .sa{color:#BA2121}.pdoc-code .sb{color:#BA2121}.pdoc-code .sc{color:#BA2121}.pdoc-code .dl{color:#BA2121}.pdoc-code .sd{color:#BA2121; font-style:italic}.pdoc-code .s2{color:#BA2121}.pdoc-code .se{color:#AA5D1F; font-weight:bold}.pdoc-code .sh{color:#BA2121}.pdoc-code .si{color:#A45A77; font-weight:bold}.pdoc-code .sx{color:#008000}.pdoc-code .sr{color:#A45A77}.pdoc-code .s1{color:#BA2121}.pdoc-code .ss{color:#19177C}.pdoc-code .bp{color:#008000}.pdoc-code .fm{color:#0000FF}.pdoc-code .vc{color:#19177C}.pdoc-code .vg{color:#19177C}.pdoc-code .vi{color:#19177C}.pdoc-code .vm{color:#19177C}.pdoc-code .il{color:#666666}</style>
<style>:root{--pdoc-background:#fff;}.pdoc{--text:#212529;--muted:#6c757d;--link:#3660a5;--link-hover:#1659c5;--code:#f8f8f8;--active:#fff598;--accent:#eee;--accent2:#c1c1c1;--nav-hover:rgba(255, 255, 255, 0.5);--name:#0066BB;--def:#008800;--annotation:#007020;}</style>
<style>.pdoc{color:var(--text);box-sizing:border-box;line-height:1.5;background:none;}.pdoc .pdoc-button{cursor:pointer;display:inline-block;border:solid black 1px;border-radius:2px;font-size:.75rem;padding:calc(0.5em - 1px) 1em;transition:100ms all;}.pdoc .pdoc-alert{padding:1rem 1rem 1rem calc(1.5rem + 24px);border:1px solid transparent;border-radius:.25rem;background-repeat:no-repeat;background-position:1rem center;margin-bottom:1rem;}.pdoc .pdoc-alert > *:last-child{margin-bottom:0;}.pdoc .pdoc-alert-note {color:#084298;background-color:#cfe2ff;border-color:#b6d4fe;background-image:url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2224%22%20height%3D%2224%22%20fill%3D%22%23084298%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22M8%2016A8%208%200%201%200%208%200a8%208%200%200%200%200%2016zm.93-9.412-1%204.705c-.07.34.029.533.304.533.194%200%20.487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703%200-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381%202.29-.287zM8%205.5a1%201%200%201%201%200-2%201%201%200%200%201%200%202z%22/%3E%3C/svg%3E");}.pdoc .pdoc-alert-warning{color:#664d03;background-color:#fff3cd;border-color:#ffecb5;background-image:url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2224%22%20height%3D%2224%22%20fill%3D%22%23664d03%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22M8.982%201.566a1.13%201.13%200%200%200-1.96%200L.165%2013.233c-.457.778.091%201.767.98%201.767h13.713c.889%200%201.438-.99.98-1.767L8.982%201.566zM8%205c.535%200%20.954.462.9.995l-.35%203.507a.552.552%200%200%201-1.1%200L7.1%205.995A.905.905%200%200%201%208%205zm.002%206a1%201%200%201%201%200%202%201%201%200%200%201%200-2z%22/%3E%3C/svg%3E");}.pdoc .pdoc-alert-danger{color:#842029;background-color:#f8d7da;border-color:#f5c2c7;background-image:url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2224%22%20height%3D%2224%22%20fill%3D%22%23842029%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22M5.52.359A.5.5%200%200%201%206%200h4a.5.5%200%200%201%20.474.658L8.694%206H12.5a.5.5%200%200%201%20.395.807l-7%209a.5.5%200%200%201-.873-.454L6.823%209.5H3.5a.5.5%200%200%201-.48-.641l2.5-8.5z%22/%3E%3C/svg%3E");}.pdoc .visually-hidden{position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;white-space:nowrap !important;border:0 !important;}.pdoc h1, .pdoc h2, .pdoc h3{font-weight:300;margin:.3em 0;padding:.2em 0;}.pdoc > section:not(.module-info) h1{font-size:1.5rem;font-weight:500;}.pdoc > section:not(.module-info) h2{font-size:1.4rem;font-weight:500;}.pdoc > section:not(.module-info) h3{font-size:1.3rem;font-weight:500;}.pdoc > section:not(.module-info) h4{font-size:1.2rem;}.pdoc > section:not(.module-info) h5{font-size:1.1rem;}.pdoc a{text-decoration:none;color:var(--link);}.pdoc a:hover{color:var(--link-hover);}.pdoc blockquote{margin-left:2rem;}.pdoc pre{border-top:1px solid var(--accent2);border-bottom:1px solid var(--accent2);margin-top:0;margin-bottom:1em;padding:.5rem 0 .5rem .5rem;overflow-x:auto;background-color:var(--code);}.pdoc code{color:var(--text);padding:.2em .4em;margin:0;font-size:85%;background-color:var(--code);border-radius:6px;}.pdoc a > code{color:inherit;}.pdoc pre > code{display:inline-block;font-size:inherit;background:none;border:none;padding:0;}.pdoc > section:not(.module-info){margin-bottom:1.5rem;}.pdoc .modulename{margin-top:0;font-weight:bold;}.pdoc .modulename a{color:var(--link);transition:100ms all;}.pdoc .git-button{float:right;border:solid var(--link) 1px;}.pdoc .git-button:hover{background-color:var(--link);color:var(--pdoc-background);}.view-source-toggle-state,.view-source-toggle-state ~ .pdoc-code{display:none;}.view-source-toggle-state:checked ~ .pdoc-code{display:block;}.view-source-button{display:inline-block;float:right;font-size:.75rem;line-height:1.5rem;color:var(--muted);padding:0 .4rem 0 1.3rem;cursor:pointer;text-indent:-2px;}.view-source-button > span{visibility:hidden;}.module-info .view-source-button{float:none;display:flex;justify-content:flex-end;margin:-1.2rem .4rem -.2rem 0;}.view-source-button::before{position:absolute;content:"View Source";display:list-item;list-style-type:disclosure-closed;}.view-source-toggle-state:checked ~ .attr .view-source-button::before,.view-source-toggle-state:checked ~ .view-source-button::before{list-style-type:disclosure-open;}.pdoc .docstring{margin-bottom:1.5rem;}.pdoc section:not(.module-info) .docstring{margin-left:clamp(0rem, 5vw - 2rem, 1rem);}.pdoc .docstring .pdoc-code{margin-left:1em;margin-right:1em;}.pdoc h1:target,.pdoc h2:target,.pdoc h3:target,.pdoc h4:target,.pdoc h5:target,.pdoc h6:target,.pdoc .pdoc-code > pre > span:target{background-color:var(--active);box-shadow:-1rem 0 0 0 var(--active);}.pdoc .pdoc-code > pre > span:target{display:block;}.pdoc div:target > .attr,.pdoc section:target > .attr,.pdoc dd:target > a{background-color:var(--active);}.pdoc *{scroll-margin:2rem;}.pdoc .pdoc-code .linenos{user-select:none;}.pdoc .attr:hover{filter:contrast(0.95);}.pdoc section, .pdoc .classattr{position:relative;}.pdoc .headerlink{--width:clamp(1rem, 3vw, 2rem);position:absolute;top:0;left:calc(0rem - var(--width));transition:all 100ms ease-in-out;opacity:0;}.pdoc .headerlink::before{content:"#";display:block;text-align:center;width:var(--width);height:2.3rem;line-height:2.3rem;font-size:1.5rem;}.pdoc .attr:hover ~ .headerlink,.pdoc *:target > .headerlink,.pdoc .headerlink:hover{opacity:1;}.pdoc .attr{display:block;margin:.5rem 0 .5rem;padding:.4rem .4rem .4rem 1rem;background-color:var(--accent);overflow-x:auto;}.pdoc .classattr{margin-left:2rem;}.pdoc .name{color:var(--name);font-weight:bold;}.pdoc .def{color:var(--def);font-weight:bold;}.pdoc .signature{background-color:transparent;}.pdoc .param, .pdoc .return-annotation{white-space:pre;}.pdoc .signature.multiline .param{display:block;}.pdoc .signature.condensed .param{display:inline-block;}.pdoc .annotation{color:var(--annotation);}.pdoc .view-value-toggle-state,.pdoc .view-value-toggle-state ~ .default_value{display:none;}.pdoc .view-value-toggle-state:checked ~ .default_value{display:inherit;}.pdoc .view-value-button{font-size:.5rem;vertical-align:middle;border-style:dashed;margin-top:-0.1rem;}.pdoc .view-value-button:hover{background:white;}.pdoc .view-value-button::before{content:"show";text-align:center;width:2.2em;display:inline-block;}.pdoc .view-value-toggle-state:checked ~ .view-value-button::before{content:"hide";}.pdoc .inherited{margin-left:2rem;}.pdoc .inherited dt{font-weight:700;}.pdoc .inherited dt, .pdoc .inherited dd{display:inline;margin-left:0;margin-bottom:.5rem;}.pdoc .inherited dd:not(:last-child):after{content:", ";}.pdoc .inherited .class:before{content:"class ";}.pdoc .inherited .function a:after{content:"()";}.pdoc .search-result .docstring{overflow:auto;max-height:25vh;}.pdoc .search-result.focused > .attr{background-color:var(--active);}.pdoc .attribution{margin-top:2rem;display:block;opacity:0.5;transition:all 200ms;filter:grayscale(100%);}.pdoc .attribution:hover{opacity:1;filter:grayscale(0%);}.pdoc .attribution img{margin-left:5px;height:35px;vertical-align:middle;width:70px;transition:all 200ms;}.pdoc table{display:block;width:max-content;max-width:100%;overflow:auto;margin-bottom:1rem;}.pdoc table th{font-weight:600;}.pdoc table th, .pdoc table td{padding:6px 13px;border:1px solid var(--accent2);}</style>